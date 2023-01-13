import * as Comlink from 'comlink';
import { threads } from 'wasm-feature-detect';
import * as Stats from 'stats.js';
import GUI from 'lil-gui';
import { HandlersWrap } from './wasm-worker';

(async () => {
    const $ = (id: string) => document.getElementById(id);
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const canvas = $('canvas') as HTMLCanvasElement;

    // check if required features are supported, else show error and exit
    if (!(await threads()) || !HTMLCanvasElement.prototype.transferControlToOffscreen) {
        const errorString = 'Required features not supported';
        console.error(errorString);
        const ctx = canvas.getContext('2d');
        ctx.font = '13px monospace';
        ctx.fillStyle = useDarkMode ? 'white' : 'black';
        ctx.fillText(errorString, 0, 20);
        return;
    }

    // create WASM web worker and get handlers for interaction
    const handlers = await Comlink.wrap<HandlersWrap>(
        new Worker(new URL('./wasm-worker.ts', import.meta.url), {
            type: 'module'
        })
    ).handlers;

    // attach perf stats window
    const stats = new Stats();
    stats.dom.style.position = 'absolute';
    const simPanel = stats.addPanel(new Stats.Panel('MS (Sim)', '#ff8', '#221'));
    stats.showPanel(stats.dom.children.length - 1); // ms per sim step
    $('container').appendChild(stats.dom);

    // attach controls window
    const gui = new GUI({ autoPlace: false });
    gui.domElement.style.opacity = '0.9';
    let props = {
        threads: await handlers.numThreads,
        particles: 0,
        block: async () => {
            setInfo(await handlers.addBlock());
        },
        reset: async () => {
            setInfo(await handlers.reset());
        },
    };
    const particlesControl = gui.add(props, 'particles').disable();
    const setInfo = (numParticles: number) => {
        props.particles = numParticles;
        particlesControl.updateDisplay();
    };
    gui.add(props, 'threads').disable();
    gui.add(props, 'block').name("add block");
    gui.add(props, 'reset').name("reset simulation");
    $('gui').appendChild(gui.domElement);

    // create offscreen canvas, pass to worker, and start WASM sim+render loop in worker
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const numParticles = await handlers.init(Comlink.transfer(offscreenCanvas, [offscreenCanvas]), Comlink.proxy(stats), Comlink.proxy(simPanel), useDarkMode);
    setInfo(numParticles);
})();