import * as Comlink from 'comlink';
import * as Stats from 'stats.js';
import { Simulation } from './pkg';

export type HandlersWrap = {
    handlers: Handlers;
}

export type Handlers = {
    sim: Simulation;
    numThreads: number;
    init: (offscreenCanvas: OffscreenCanvas, stats: Stats, useDarkMode: boolean) => number;
    addBlock: () => number;
    reset: () => number;
};

const initHandlers = async (): Promise<Handlers> => {
    const rust_wasm = await import('./pkg');
    await rust_wasm.default();
    const numThreads = navigator.hardwareConcurrency;
    // must be included to init rayon thread pool with web workers
    await rust_wasm.initThreadPool(numThreads);
    return Comlink.proxy({
        sim: null,
        numThreads: numThreads,
        init(offscreenCanvas: OffscreenCanvas, stats: Stats, useDarkMode: boolean) {
            this.sim = new rust_wasm.Simulation(offscreenCanvas, useDarkMode);
            const step = () => {
                stats.begin(); // collect perf data for stats.js
                this.sim.step(); // update and redraw to canvas
                stats.end();
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            return this.sim.get_num_particles();
        },
        addBlock() {
            this.sim.add_block();
            return this.sim.get_num_particles();
        },
        reset() {
            this.sim.reset();
            return this.sim.get_num_particles();
        },
    });
};

Comlink.expose({ handlers: initHandlers() });