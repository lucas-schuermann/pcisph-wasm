"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[189,235,517],{235:(e,t,n)=>{n.r(t),n.d(t,{Simulation:()=>S,default:()=>R,initSync:()=>I,initThreadPool:()=>m,wbg_rayon_PoolBuilder:()=>x,wbg_rayon_start_worker:()=>y});var r=n(517);let o;const a=new Array(32).fill(void 0);function _(e){return a[e]}a.push(void 0,null,!0,!1);let i=a.length;function c(e){const t=_(e);return function(e){e<36||(a[e]=i,i=e)}(e),t}const b=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});b.decode();let s=new Uint8Array;function u(){return s.buffer!==o.memory.buffer&&(s=new Uint8Array(o.memory.buffer)),s}function f(e,t){return b.decode(u().slice(e,e+t))}function w(e){i===a.length&&a.push(a.length+1);const t=i;return i=a[t],a[t]=e,t}let g=32,d=new Int32Array;function l(){return d.buffer!==o.memory.buffer&&(d=new Int32Array(o.memory.buffer)),d}function m(e){return c(o.initThreadPool(e))}function y(e){o.wbg_rayon_start_worker(e)}function h(e){return null==e}function p(e,t){try{return e.apply(this,t)}catch(e){o.__wbindgen_exn_store(w(e))}}let A=new Float32Array;let v=0;const k=new TextEncoder("utf-8");function P(e,t,n){if(void 0===n){const n=k.encode(e),r=t(n.length);return u().subarray(r,r+n.length).set(n),v=n.length,r}let r=e.length,o=t(r);const a=u();let _=0;for(;_<r;_++){const t=e.charCodeAt(_);if(t>127)break;a[o+_]=t}if(_!==r){0!==_&&(e=e.slice(_)),o=n(o,r,r=_+3*e.length);const t=function(e,t){const n=k.encode(e);return t.set(n),{read:e.length,written:n.length}}(e,u().subarray(o+_,o+r));_+=t.written}return v=_,o}class S{static __wrap(e){const t=Object.create(S.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();o.__wbg_simulation_free(e)}constructor(e,t){try{const _=o.__wbindgen_add_to_stack_pointer(-16);o.simulation_new(_,function(e){if(1==g)throw new Error("out of js stack");return a[--g]=e,g}(e),t);var n=l()[_/4+0],r=l()[_/4+1];if(l()[_/4+2])throw c(r);return S.__wrap(n)}finally{o.__wbindgen_add_to_stack_pointer(16),a[g++]=void 0}}get_num_particles(){return o.simulation_get_num_particles(this.ptr)>>>0}step(){o.simulation_step(this.ptr)}add_block(){o.simulation_add_block(this.ptr)}reset(){o.simulation_reset(this.ptr)}}class x{static __wrap(e){const t=Object.create(x.prototype);return t.ptr=e,t}__destroy_into_raw(){const e=this.ptr;return this.ptr=0,e}free(){const e=this.__destroy_into_raw();o.__wbg_wbg_rayon_poolbuilder_free(e)}numThreads(){return o.wbg_rayon_poolbuilder_numThreads(this.ptr)>>>0}receiver(){return o.wbg_rayon_poolbuilder_receiver(this.ptr)}build(){o.wbg_rayon_poolbuilder_build(this.ptr)}}function L(){const e={wbg:{}};return e.wbg.__wbg_createShader_46a66dce5a9e22d0=function(e,t){const n=_(e).createShader(t>>>0);return h(n)?0:w(n)},e.wbg.__wbg_shaderSource_5111981e7afb61fb=function(e,t,n,r){_(e).shaderSource(_(t),f(n,r))},e.wbg.__wbg_compileShader_822f38928f6f2a08=function(e,t){_(e).compileShader(_(t))},e.wbg.__wbg_getShaderParameter_6cd8c36fded266ea=function(e,t,n){return w(_(e).getShaderParameter(_(t),n>>>0))},e.wbg.__wbindgen_boolean_get=function(e){const t=_(e);return"boolean"==typeof t?t?1:0:2},e.wbg.__wbindgen_object_drop_ref=function(e){c(e)},e.wbg.__wbg_getShaderInfoLog_451545b963646762=function(e,t,n){const r=_(t).getShaderInfoLog(_(n));var a=h(r)?0:P(r,o.__wbindgen_malloc,o.__wbindgen_realloc),i=v;l()[e/4+1]=i,l()[e/4+0]=a},e.wbg.__wbg_setwidth_afb418d3fbf71ba7=function(e,t){_(e).width=t>>>0},e.wbg.__wbg_setheight_3eb8729b59493242=function(e,t){_(e).height=t>>>0},e.wbg.__wbg_getContext_4d5e97892c1b206a=function(){return p((function(e,t,n){const r=_(e).getContext(f(t,n));return h(r)?0:w(r)}),arguments)},e.wbg.__wbg_instanceof_WebGl2RenderingContext_fcfa91cd777063f3=function(e){let t;try{t=_(e)instanceof WebGL2RenderingContext}catch{t=!1}return t},e.wbg.__wbg_clearColor_bc89a6580c0498c3=function(e,t,n,r,o){_(e).clearColor(t,n,r,o)},e.wbg.__wbindgen_string_new=function(e,t){return w(f(e,t))},e.wbg.__wbg_createProgram_dc6b23d3caa1d86e=function(e){const t=_(e).createProgram();return h(t)?0:w(t)},e.wbg.__wbg_attachShader_90ad543fb1bccb18=function(e,t,n){_(e).attachShader(_(t),_(n))},e.wbg.__wbg_linkProgram_c33885d9ea798810=function(e,t){_(e).linkProgram(_(t))},e.wbg.__wbg_getProgramParameter_acf4ae158143e2b2=function(e,t,n){return w(_(e).getProgramParameter(_(t),n>>>0))},e.wbg.__wbg_getProgramInfoLog_1e37a3d1d090ec1c=function(e,t,n){const r=_(t).getProgramInfoLog(_(n));var a=h(r)?0:P(r,o.__wbindgen_malloc,o.__wbindgen_realloc),i=v;l()[e/4+1]=i,l()[e/4+0]=a},e.wbg.__wbg_useProgram_35a58ac1e0d9577b=function(e,t){_(e).useProgram(_(t))},e.wbg.__wbg_getUniformLocation_0da0c93f626244a2=function(e,t,n,r){const o=_(e).getUniformLocation(_(t),f(n,r));return h(o)?0:w(o)},e.wbg.__wbg_uniformMatrix4fv_68d11b378757596e=function(e,t,n,r,a){var i,c;_(e).uniformMatrix4fv(_(t),0!==n,(i=r,c=a,(A.buffer!==o.memory.buffer&&(A=new Float32Array(o.memory.buffer)),A).subarray(i/4,i/4+c)))},e.wbg.__wbg_getAttribLocation_b6cb917615347567=function(e,t,n,r){return _(e).getAttribLocation(_(t),f(n,r))},e.wbg.__wbg_createBuffer_a6cffb7f7d5b92a3=function(e){const t=_(e).createBuffer();return h(t)?0:w(t)},e.wbg.__wbg_bindBuffer_66e359418f5c82d7=function(e,t,n){_(e).bindBuffer(t>>>0,_(n))},e.wbg.__wbg_vertexAttribPointer_3b06d737566f0745=function(e,t,n,r,o,a,i){_(e).vertexAttribPointer(t>>>0,n,r>>>0,0!==o,a,i)},e.wbg.__wbg_enableVertexAttribArray_a1ffc091f3999354=function(e,t){_(e).enableVertexAttribArray(t>>>0)},e.wbg.__wbg_bufferData_8d206d7adf6751c0=function(e,t,n,r){_(e).bufferData(t>>>0,_(n),r>>>0)},e.wbg.__wbindgen_memory=function(){return w(o.memory)},e.wbg.__wbg_buffer_3f3d764d4747d564=function(e){return w(_(e).buffer)},e.wbg.__wbg_newwithbyteoffsetandlength_be22e5fcf4f69ab4=function(e,t,n){return w(new Float32Array(_(e),t>>>0,n>>>0))},e.wbg.__wbg_bufferSubData_0e04c6c7fec3c949=function(e,t,n,r){_(e).bufferSubData(t>>>0,n,_(r))},e.wbg.__wbg_clear_05614d3b84e96aae=function(e,t){_(e).clear(t>>>0)},e.wbg.__wbg_drawArrays_d587302f7a868d91=function(e,t,n,r){_(e).drawArrays(t>>>0,n,r)},e.wbg.__wbindgen_throw=function(e,t){throw new Error(f(e,t))},e.wbg.__wbindgen_module=function(){return w(M.__wbindgen_wasm_module)},e.wbg.__wbg_startWorkers_6fd3af285ea11136=function(e,t,n){return w((0,r.Q)(c(e),c(t),x.__wrap(n)))},e}function W(e,t){e.wbg.memory=t||new WebAssembly.Memory({initial:18,maximum:16384,shared:!0})}function C(e,t){return o=e.exports,M.__wbindgen_wasm_module=t,A=new Float32Array,d=new Int32Array,s=new Uint8Array,o.__wbindgen_start(),o}function I(e,t){const n=L();return W(n,t),e instanceof WebAssembly.Module||(e=new WebAssembly.Module(e)),C(new WebAssembly.Instance(e,n),e)}async function M(e,t){void 0===e&&(e=new URL(n(275),n.b));const r=L();("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e)),W(r,t);const{instance:o,module:a}=await async function(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"==e.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}(await e,r);return C(o,a)}const R=M},517:(e,t,n)=>{function r(e,t){return new Promise((n=>{e.addEventListener("message",(function r({data:o}){null!=o&&o.type===t&&(e.removeEventListener("message",r),n(o))}))}))}let o;async function a(e,t,a){const _={type:"wasm_bindgen_worker_init",module:e,memory:t,receiver:a.receiver()};o=await Promise.all(Array.from({length:a.numThreads()},(async()=>{const e=new Worker(new URL(n.p+n.u(517),n.b),{type:void 0});return e.postMessage(_),await r(e,"wasm_bindgen_worker_ready"),e}))),a.build()}n.d(t,{Q:()=>a}),r(self,"wasm_bindgen_worker_init").then((async e=>{const t=await n.e(235).then(n.bind(n,235));await t.default(e.module,e.memory),postMessage({type:"wasm_bindgen_worker_ready"}),t.wbg_rayon_start_worker(e.receiver)}))},275:(e,t,n)=>{e.exports=n.p+"e77d5f6c59379456c686.wasm"}}]);