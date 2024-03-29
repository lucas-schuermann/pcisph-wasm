import * as Comlink from 'comlink';
import * as Stats from 'stats.js';
import { Simulation } from './pkg';

export type HandlersWrap = {
    handlers: Handlers;
}

export type Handlers = {
    sim: Simulation;
    numThreads: number;
    init: (offscreenCanvas: OffscreenCanvas, stats: Stats, simPanel: Stats.Panel, useDarkMode: boolean) => number;
    addBlock: () => number;
    reset: () => number;
};

const initHandlers = async (): Promise<Handlers> => {
    const rust_wasm = await import('./pkg');
    await rust_wasm.default();
    const numThreads = navigator.hardwareConcurrency;
    let maxSimMs = 0;
    // must be included to init rayon thread pool with web workers
    await rust_wasm.initThreadPool(numThreads);
    return Comlink.proxy({
        sim: null,
        numThreads: numThreads,
        init(offscreenCanvas: OffscreenCanvas, stats: Stats, simPanel: Stats.Panel, useDarkMode: boolean) {
            this.sim = new rust_wasm.Simulation(offscreenCanvas, useDarkMode);
            const step = () => {
                stats.begin(); // collect perf data for stats.js
                let simTimeMs = performance.now();
                this.sim.step();
                simTimeMs = performance.now() - simTimeMs;
                this.sim.draw();
                simPanel.update(simTimeMs, (maxSimMs = Math.max(maxSimMs, simTimeMs)));
                stats.end();
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            return this.sim.num_particles;
        },
        addBlock() {
            this.sim.add_block();
            return this.sim.num_particles;
        },
        reset() {
            this.sim.reset();
            return this.sim.num_particles;
        },
    });
};

Comlink.expose({ handlers: initHandlers() });