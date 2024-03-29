use std::borrow::Cow;

use glam::Vec2;
use glium::{glutin, index, uniform, Surface, VertexFormat};
use glutin::event::{ElementState, Event, KeyboardInput, StartCause, VirtualKeyCode, WindowEvent};
use log::info;

const DAM_PARTICLES: usize = 75 * 75;
const BLOCK_PARTICLES: usize = 500;
const MAX_PARTICLES: usize = solver::MAX_PARTICLES;
const POINT_SIZE: f32 = 7.5;

#[allow(clippy::too_many_lines)]
fn main() -> Result<(), String> {
    env_logger::init();

    let mut sim = solver::State::new();
    sim.init_dam_break(DAM_PARTICLES);
    info!(
        "Initialized dam break with {} particles",
        sim.particles.len()
    );

    let event_loop = glutin::event_loop::EventLoop::new();
    let size: glutin::dpi::LogicalSize<u32> = (solver::WINDOW_WIDTH, solver::WINDOW_HEIGHT).into();
    let wb = glutin::window::WindowBuilder::new()
        .with_inner_size(size)
        .with_resizable(false)
        .with_title("PCISPH");
    let cb = glutin::ContextBuilder::new();
    let display = glium::Display::new(wb, cb, &event_loop)
        .map_err(|e| format!("Failed to create glium display: {e}"))?;

    let vertex_shader_src = r#"
        #version 140
        uniform mat4 u_matrix;
        in vec2 in_position;
        void main() {
            gl_Position = u_matrix * vec4(in_position, 0.0, 1.0);
        }
    "#;
    let fragment_shader_src = r#"
        #version 140
        out vec4 out_color;
        void main() {
            out_color = vec4(0.2, 0.6, 1.0, 1.0);
        }
    "#;
    let program =
        glium::Program::from_source(&display, vertex_shader_src, fragment_shader_src, None)
            .map_err(|e| format!("Failed to parse vertex shader source: {e}"))?;
    let ortho_matrix: [[f32; 4]; 4] =
        cgmath::ortho(0.0, solver::VIEW_WIDTH, 0.0, solver::VIEW_HEIGHT, 0.0, 1.0).into();
    let uniforms = uniform! {
        u_matrix: ortho_matrix
    };
    let indices = index::NoIndices(index::PrimitiveType::Points);

    // preallocate vertex buffer
    let mut vertex_data = vec![Vec2::ZERO; MAX_PARTICLES];
    let bindings: VertexFormat = Cow::Owned(vec![(
        Cow::Borrowed("in_position"),
        0,
        0,
        glium::vertex::AttributeType::F32F32,
        false,
    )]);
    let vertex_buffer = unsafe {
        glium::VertexBuffer::new_raw_dynamic(
            &display,
            &vertex_data,
            bindings,
            2 * std::mem::size_of::<f32>(),
        )
        .map_err(|e| format!("Failed to create vertex buffer: {e}"))?
    };
    let draw_params = glium::DrawParameters {
        polygon_mode: glium::PolygonMode::Point,
        point_size: Some(POINT_SIZE),
        ..Default::default()
    };

    event_loop.run(move |event, _, control_flow| {
        match event {
            Event::WindowEvent { event, .. } => match event {
                WindowEvent::CloseRequested => {
                    *control_flow = glutin::event_loop::ControlFlow::Exit;
                    return;
                }
                WindowEvent::KeyboardInput {
                    input:
                        KeyboardInput {
                            virtual_keycode: Some(virtual_code),
                            state,
                            ..
                        },
                    ..
                } => match (virtual_code, state) {
                    (VirtualKeyCode::R, ElementState::Pressed) => {
                        vertex_buffer.invalidate();
                        sim.clear();
                        info!("Cleared simulation");
                        sim.init_dam_break(DAM_PARTICLES);
                    }
                    (VirtualKeyCode::Space, ElementState::Pressed) => {
                        if sim.particles.len() + BLOCK_PARTICLES < MAX_PARTICLES {
                            sim.init_block(BLOCK_PARTICLES);
                            info!(
                                "Initialized block of {BLOCK_PARTICLES} particles, new total {}",
                                sim.particles.len()
                            );
                        } else {
                            info!("Max particles reached");
                        }
                    }
                    (VirtualKeyCode::Escape, ElementState::Pressed) => {
                        *control_flow = glutin::event_loop::ControlFlow::Exit;
                        return;
                    }
                    _ => (),
                },
                _ => return,
            },
            Event::NewEvents(cause) => match cause {
                StartCause::Init | StartCause::Poll => (),
                _ => return,
            },
            _ => return,
        }

        sim.update();

        // draw
        vertex_data.clear();
        sim.particles.iter().for_each(|p| vertex_data.push(p.x));
        vertex_buffer
            .slice(0..vertex_data.len())
            .unwrap()
            .write(&vertex_data); // safe due to preallocated known length

        let mut target = display.draw();
        target.clear_color(0.9, 0.9, 0.9, 1.0);
        target
            .draw(
                vertex_buffer.slice(0..sim.particles.len()).unwrap(),
                indices,
                &program,
                &uniforms,
                &draw_params,
            )
            .unwrap();
        target.finish().unwrap();
    });
}
