import('./pkg')
    .then(rust_module => {
        let sim = new rust_module.Simulation();
        console.log(sim);

        const blockBtn = document.getElementById('block');
        const resetBtn = document.getElementById('reset');

        blockBtn.addEventListener('click', () => {
            sim.block();
        });
        resetBtn.addEventListener('click', () => {
            sim.reset();
        });

        const step = () => {
            sim.step();
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    })
    .catch(console.error);