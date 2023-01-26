![Build](https://github.com/cerrno/pcisph-wasm/actions/workflows/main.yml/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/09a7b67d-f1cb-44e3-b651-ee2dd0fb90ce/deploy-status)](https://app.netlify.com/sites/pcisph-wasm/deploys)

`pcisph-wasm` is a 2D Predictive-Corrective Smoothed Particle Hydrodynamics (SPH) simulation in Rust with WASM + WebGL. It implements a parallelized solver using [rayon](https://github.com/rayon-rs/rayon) and [wasm-bindgen-rayon](https://github.com/GoogleChromeLabs/wasm-bindgen-rayon).

For a quick demo, please see https://pcisph-wasm.netlify.app. The WASM version of this project is deployed to Netlify (since Github Pages does not support setting HTTP headers) after building with Github Actions. Further information can be found on on [my website](https://lucasschuermann.com/writing), including an introduction to [SPH math](https://lucasschuermann.com/writing/particle-based-fluid-simulation) and a [simple SPH solver](https://lucasschuermann.com/writing/implementing-sph-in-2d).

## Running
### Package Dependencies
```bash
# debian/ubuntu
apt install build-essential pkg-config cmake libfreetype6-dev libfontconfig1-dev
```

### Native (cargo)
```bash
RUST_LOG=info cargo run --package native --release
```
Press `r` to reset simulation or `space` to add a block of particles

### Web (npm)
```bash
# install dependencies
npm install

# compile to WASM, run webpack, and spawn a local server
npm run serve
```
Then visit http://localhost:8080

## License
This project is distributed under the [MIT license](LICENSE.md).

## Note
This solver is not exactly PCISPH, but can be viewed as 1-iteration of SPH relaxation plus sub-stepping. The “prediction-relaxation” scheme of my implementation actually comes mainly from the (much easier to follow) paper ["Particle-based Viscoelastic Fluid Simulation”](https://dl.acm.org/doi/10.1145/1073368.1073400), as opposed to ["Predictive-Corrective Incompressible SPH”](https://dl.acm.org/doi/10.1145/1576246.1531346).
