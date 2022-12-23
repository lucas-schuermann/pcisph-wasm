use std::f32::consts::PI;

use glam::{vec2, vec3, UVec2, Vec2, Vec3};
use rayon::prelude::*;

#[cfg(target_arch = "wasm32")]
// must be included to init rayon thread pool with web workers
pub use wasm_bindgen_rayon::init_thread_pool;

pub const G: Vec2 = glam::vec2(0.0, -9.81);
pub const WINDOW_WIDTH: u32 = 1024;
pub const WINDOW_HEIGHT: u32 = 720;
pub const VIEW_WIDTH: f32 = 20.0;
pub const VIEW_HEIGHT: f32 = WINDOW_HEIGHT as f32 * VIEW_WIDTH / WINDOW_WIDTH as f32;

const SOLVER_STEPS: usize = 10;
const REST_DENS: f32 = 45.0;
const STIFFNESS: f32 = 0.08;
const STIFF_APPROX: f32 = 0.1;
const SURFACE_TENSION: f32 = 0.0001;
const LINEAR_VISC: f32 = 0.25;
const QUAD_VISC: f32 = 0.5;
const PARTICLE_RADIUS: f32 = 0.03;
const H: f32 = 6.0 * PARTICLE_RADIUS;
const H2: f32 = H * H;
const DT: f32 = (1.0 / 40.0) / SOLVER_STEPS as f32;
const DT2: f32 = DT * DT;
const KERN: f32 = 20.0 / (2.0 * PI * H * H);
const KERN_NORM: f32 = 30.0 / (2.0 * PI * H * H);
const EPS: f32 = 0.000_000_1;
const EPS2: f32 = EPS * EPS;

const CELL_SIZE: f32 = H; // set to smoothing radius
const GRID_WIDTH: usize = (VIEW_WIDTH / CELL_SIZE) as usize;
const GRID_HEIGHT: usize = (VIEW_HEIGHT / CELL_SIZE) as usize;
const NUM_CELLS: usize = GRID_WIDTH * GRID_HEIGHT;
const NUM_NEIGHBORS: usize = 64;
pub const MAX_PARTICLES: usize = 30_000;

#[derive(Debug, Clone, Copy, Default)]
pub struct Particle {
    pub x: Vec2,
    xlast: Vec2,
    v: Vec2,
    m: f32,
    p: f32,
    pv: f32,
    grid_index: UVec2,
}

impl Particle {
    #[must_use]
    pub fn new(x: f32, y: f32) -> Self {
        Self {
            x: Vec2::new(x, y),
            m: 1.0,
            ..Default::default()
        }
    }
}

#[derive(Debug, Default)]
pub struct State {
    pub particles: Vec<Particle>,
    particles_initial: Vec<Particle>,
    boundaries: [Vec3; 4],
    grid: Vec<Vec<usize>>,
    neighborhoods: Vec<Vec<Neighbor>>,
}

#[derive(Debug)]
struct Neighbor {
    index: usize,
    r: f32,
}

impl State {
    #[must_use]
    pub fn new() -> Self {
        let particles = Vec::with_capacity(MAX_PARTICLES);
        let particles_initial = Vec::with_capacity(MAX_PARTICLES);
        let boundaries = [
            vec3(1.0, 0.0, 0.0),           // left
            vec3(0.0, 1.0, 0.0),           // bottom
            vec3(-1.0, 0.0, -VIEW_WIDTH),  // right
            vec3(0.0, -1.0, -VIEW_HEIGHT), // top
        ];
        let grid = vec![Vec::with_capacity(NUM_NEIGHBORS); NUM_CELLS];
        Self {
            particles,
            particles_initial,
            boundaries,
            grid,
            ..State::default()
        }
    }

    pub fn clear(&mut self) {
        self.particles.clear();
        self.particles_initial.clear();
        self.neighborhoods.clear();
    }

    fn place_particle(&mut self, start: &Vec2) {
        self.particles.push(Particle::new(start.x, start.y));
        self.particles_initial.push(Particle::default());
        self.neighborhoods.push(Vec::with_capacity(NUM_NEIGHBORS));
    }

    fn place_square(&mut self, start: &mut Vec2, num_particles: usize) -> usize {
        let x0 = start.x;
        let num = f32::sqrt(num_particles as f32) as usize;
        for _ in 0..num {
            for _ in 0..num {
                self.place_particle(start);
                start.x += 2.0 * PARTICLE_RADIUS + PARTICLE_RADIUS;
            }
            start.x = x0;
            start.y -= 2.0 * PARTICLE_RADIUS + PARTICLE_RADIUS;
        }
        num * num
    }

    pub fn init_dam_break(&mut self, num_particles: usize) {
        let mut start = vec2(0.25 * VIEW_WIDTH, 0.95 * VIEW_HEIGHT);
        self.place_square(&mut start, num_particles);
    }

    pub fn init_block(&mut self, num_particles: usize) {
        let mut start = vec2(
            VIEW_WIDTH / 2.0 - VIEW_HEIGHT / 10.0,
            VIEW_HEIGHT - VIEW_HEIGHT / 10.0,
        );
        self.place_square(&mut start, num_particles);
    }

    fn integrate_insert(&mut self) {
        let grid = &mut self.grid;
        grid.iter_mut().for_each(std::vec::Vec::clear);
        self.particles.iter_mut().enumerate().for_each(|(i, p)| {
            p.v += G * DT;
            p.xlast = p.x;
            p.x += DT * p.v;

            let xind = (p.x.x / CELL_SIZE).floor() as usize;
            let yind = (p.x.y / CELL_SIZE).floor() as usize;
            let xind = usize::max(1, usize::min(GRID_WIDTH - 2, xind));
            let yind = usize::max(1, usize::min(GRID_HEIGHT - 2, yind));
            grid[xind + yind * GRID_WIDTH].push(i);
            p.grid_index = UVec2::new(xind as u32, (yind * GRID_WIDTH) as u32);
        });
    }

    fn compute_forces(&mut self) {
        // TODO can we get around this copy
        self.particles_initial.copy_from_slice(&self.particles);
        let grid = &self.grid;
        self.particles
            .par_iter_mut()
            .zip_eq(self.neighborhoods.par_iter_mut())
            .for_each(|(pi, ni)| {
                ni.clear();
                let mut dens = 0.0;
                let mut dens_proj = 0.0;
                for gx in (pi.grid_index.x - 1)..=(pi.grid_index.x + 1) {
                    let y_range = (pi.grid_index.y - GRID_WIDTH as u32)
                        ..=(pi.grid_index.y + GRID_WIDTH as u32);
                    for gy in y_range.step_by(GRID_WIDTH) {
                        for j in &grid[(gx + gy) as usize] {
                            let pj = self.particles_initial[*j];
                            let dx = pj.x - pi.x;
                            let r2 = dx.length_squared();
                            if !(EPS2..=H2).contains(&r2) {
                                continue;
                            }
                            let r = f32::sqrt(r2);
                            let a = 1.0 - r / H;
                            dens += pj.m * a * a * a * KERN;
                            dens_proj += pj.m * a * a * a * a * KERN_NORM;
                            if ni.len() < NUM_NEIGHBORS {
                                ni.push(Neighbor { index: *j, r });
                            }
                        }
                    }
                }
                pi.p = STIFFNESS * (dens - pi.m * REST_DENS);
                pi.pv = STIFF_APPROX * dens_proj;
            });
    }

    fn project_correct(&mut self) {
        // TODO can we get around this copy?
        self.particles_initial.copy_from_slice(&self.particles);
        let bounds = self.boundaries;
        self.particles
            .par_iter_mut()
            .zip_eq(self.neighborhoods.par_iter_mut())
            .for_each(|(pi, ni)| {
                // project
                let mut xproj = pi.x;
                for neighbor in ni {
                    let pj = self.particles_initial[neighbor.index];
                    let r = neighbor.r;
                    let dx = pj.x - pi.x;
                    let a = 1.0 - r / H;
                    let d = DT2
                        * ((pi.pv + pj.pv) * a * a * a * KERN_NORM + (pi.p + pj.p) * a * a * KERN)
                        / 2.0;

                    // relaxation
                    xproj -= d * dx / (r * pi.m);

                    // surface tension
                    xproj += (SURFACE_TENSION / pi.m) * pj.m * a * a * KERN * dx;

                    // linear and quadratic visc
                    let dv = pi.v - pj.v;
                    let mut u = dv.dot(dx);
                    if u > 0.0 {
                        u /= r;
                        let big_i = 0.5 * DT * a * (LINEAR_VISC * u + QUAD_VISC * u * u);
                        xproj -= big_i * dx * DT;
                    }
                }

                // correct
                pi.x = xproj;
                pi.v = (xproj - pi.xlast) / DT;

                // boundary
                for b in &bounds {
                    let d = f32::max(pi.x.x * b.x + pi.x.y * b.y - b.z, 0.0);
                    if d < PARTICLE_RADIUS {
                        pi.v += (PARTICLE_RADIUS - d) * Vec2::new(b.x, b.y) / DT;
                    }
                }
            })
    }

    pub fn update(&mut self) {
        for _ in 0..SOLVER_STEPS {
            self.integrate_insert();
            self.compute_forces();
            self.project_correct();
        }
    }
}
