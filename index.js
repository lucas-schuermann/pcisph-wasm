import * as Comlink from 'comlink';
import { threads } from 'wasm-feature-detect';
import * as Stats from 'stats.js';

(async () => {
    // check if required features are supported, else show error and exit
    if (!(await threads()) || !HTMLCanvasElement.prototype.transferControlToOffscreen) {
        const errorString = 'Browser does not support required features';
        console.error(errorString);
        const canvas = document.getElementById('canvas');
        canvas.style = 'border: 1px solid red';
        const ctx = canvas.getContext('2d');
        ctx.font = '16px serif';
        ctx.fillText(errorString, 10, 25);
        return;
    }

    // create WASM web worker and get handlers for interaction
    const handlers = await Comlink.wrap(
        new Worker(new URL('./wasm-worker.js', import.meta.url), {
            type: 'module'
        })
    ).handlers;

    // attach perf stats window
    const stats = new Stats();
    stats.dom.style.position = 'absolute';
    document.getElementById('stats').appendChild(stats.dom);

    const numThreads = await handlers.numThreads;
    const setInfo = (numParticles) => document.getElementById('info').innerText = `Threads: ${numThreads}, Particles: ${numParticles}`;

    // create offscreen canvas, pass to worker, and start WASM sim+render loop in worker
    const offscreenCanvas = document.getElementById('canvas').transferControlToOffscreen();
    const numParticles = await handlers.init(Comlink.transfer(offscreenCanvas, [offscreenCanvas]), Comlink.proxy(stats));
    setInfo(numParticles);

    // bind interactivity
    document.getElementById('block').addEventListener('click', async () => {
        setInfo(await handlers.addBlock());
    });
    document.getElementById('reset').addEventListener('click', async () => {
        setInfo(await handlers.reset());
    });
})();