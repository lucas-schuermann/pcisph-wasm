import * as Comlink from 'comlink';

(async function init() {
    const handlers = await Comlink.wrap(
        new Worker(new URL('./wasm-worker.js', import.meta.url), {
            type: 'module'
        })
    ).handlers;

    let offscreen_canvas = document.getElementById('canvas').transferControlToOffscreen();
    handlers.init(Comlink.transfer(offscreen_canvas, [offscreen_canvas]));

    document.getElementById('block').addEventListener('click', () => {
        handlers.addBlock();
    });
    document.getElementById('reset').addEventListener('click', () => {
        handlers.reset();
    });
})();