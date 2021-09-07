import('./pkg')
    .then(rust_module => {
        const sim = new rust_module.Simulation();

        document.getElementById('block').addEventListener('click', () => {
            sim.add_block();
        });
        document.getElementById('reset').addEventListener('click', () => {
            sim.reset();
        });

        const step = () => {
            sim.step(); // update and redraw to canvas
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    })
    .catch(console.error);