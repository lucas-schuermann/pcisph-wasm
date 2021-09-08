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

    // create web worker and get handlers for interaction
    let handlers = await Comlink.wrap(
        new Worker(new URL('./wasm-worker.js', import.meta.url), {
            type: 'module'
        })
    ).handlers;
    let numThreads = await handlers.numThreads;

    // attach perf stats window
    const stats = new Stats();
    stats.dom.style.position = 'absolute';
    document.getElementById('stats').appendChild(stats.dom);

    const setInfo = (np) => {
        const info = document.getElementById('info');
        info.innerText = `Threads: ${numThreads}, Particles: ${np}\t\t`;
    }

    // start wasm sim+render loop in web worker
    const offscreen_canvas = document.getElementById('canvas').transferControlToOffscreen();
    const numParticles = await handlers.init(Comlink.transfer(offscreen_canvas, [offscreen_canvas]), Comlink.proxy(stats));
    setInfo(numParticles);

    // bind interactivity
    document.getElementById('block').addEventListener('click', async () => {
        const numParticles = await handlers.addBlock();
        setInfo(numParticles);
    });
    document.getElementById('reset').addEventListener('click', async () => {
        const numParticles = await handlers.reset();
        setInfo(numParticles);
    });
})();