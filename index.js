import * as Comlink from 'comlink';
import { threads } from 'wasm-feature-detect';
import * as Stats from 'stats.js';

(async () => {
    const $ = (id) => document.getElementById(id);

    // check if required features are supported, else show error and exit
    if (!(await threads()) || !HTMLCanvasElement.prototype.transferControlToOffscreen) {
        const errorString = 'Browser does not support required features';
        console.error(errorString);
        const ctx = $('canvas').getContext('2d');
        ctx.font = '16px serif';
        ctx.fillText(errorString, 0, 16);
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
    $('stats').appendChild(stats.dom);

    $('threads').innerText = await handlers.numThreads;
    const setInfo = (numParticles) => $('count').innerText = numParticles;

    // create offscreen canvas, pass to worker, and start WASM sim+render loop in worker
    const offscreenCanvas = $('canvas').transferControlToOffscreen();
    const numParticles = await handlers.init(Comlink.transfer(offscreenCanvas, [offscreenCanvas]), Comlink.proxy(stats));
    setInfo(numParticles);

    // bind interactivity
    $('block').onclick = async () => {
        setInfo(await handlers.addBlock());
    };
    $('reset').onclick = async () => {
        setInfo(await handlers.reset());
    };
})();