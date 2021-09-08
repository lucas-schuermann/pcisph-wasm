import * as Comlink from 'comlink';
import { threads } from 'wasm-feature-detect';

(async () => {
    // check if required features are supported, else show error and exit
    if (!(await threads()) || !HTMLCanvasElement.prototype.transferControlToOffscreen) {
        console.log("unsupported browser");
        const ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = '16px serif';
        ctx.fillText('Browser does not support required features', 10, 50);
        return;
    }

    // create web worker and get handlers for interaction
    const handlers = await Comlink.wrap(
        new Worker(new URL('./wasm-worker.js', import.meta.url), {
            type: 'module'
        })
    ).handlers;

    // start wasm sim+render loop in web worker, bind callbacks for interactivity
    let offscreen_canvas = document.getElementById('canvas').transferControlToOffscreen();
    handlers.init(Comlink.transfer(offscreen_canvas, [offscreen_canvas]));
    document.getElementById('block').addEventListener('click', () => {
        handlers.addBlock();
    });
    document.getElementById('reset').addEventListener('click', () => {
        handlers.reset();
    });
})();