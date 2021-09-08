import * as Comlink from 'comlink';

const initHandlers = async () => {
    const rust_wasm = await import('./pkg');
    await rust_wasm.default();
    // must be included to init rayon thread pool with web workers
    await rust_wasm.initThreadPool(navigator.hardwareConcurrency);
    return Comlink.proxy({
        sim: null,
        init(canvas) {
            this.sim = new rust_wasm.Simulation(canvas);
            const step = () => {
                this.sim.step(); // update and redraw to canvas
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        },
        addBlock() {
            this.sim.add_block();
        },
        reset() {
            this.sim.reset();
        },
    });
};

Comlink.expose({ handlers: initHandlers() });