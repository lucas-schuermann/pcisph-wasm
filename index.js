/*! For license information please see index.js.LICENSE.txt */
(()=>{var t={466:function(t){var e;t.exports=((e=function(){function t(t){return s.appendChild(t.dom),t}function i(t){for(var e=0;e<s.children.length;e++)s.children[e].style.display=e===t?"block":"none";n=t}var n=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",(function(t){t.preventDefault(),i(++n%s.children.length)}),!1);var r=(performance||Date).now(),l=r,o=0,a=t(new e.Panel("FPS","#0ff","#002")),h=t(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new e.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:s,addPanel:t,showPanel:i,begin:function(){r=(performance||Date).now()},end:function(){o++;var t=(performance||Date).now();if(h.update(t-r,200),t>l+1e3&&(a.update(1e3*o/(t-l),100),l=t,o=0,d)){var e=performance.memory;d.update(e.usedJSHeapSize/1048576,e.jsHeapSizeLimit/1048576)}return t},update:function(){r=this.end()},domElement:s,setMode:i}}).Panel=function(t,e,i){var n=1/0,s=0,r=Math.round,l=r(window.devicePixelRatio||1),o=80*l,a=48*l,h=3*l,d=2*l,c=3*l,u=15*l,p=74*l,g=30*l,m=document.createElement("canvas");m.width=o,m.height=a,m.style.cssText="width:80px;height:48px";var v=m.getContext("2d");return v.font="bold "+9*l+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=i,v.fillRect(0,0,o,a),v.fillStyle=e,v.fillText(t,h,d),v.fillRect(c,u,p,g),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(c,u,p,g),{dom:m,update:function(a,f){n=Math.min(n,a),s=Math.max(s,a),v.fillStyle=i,v.globalAlpha=1,v.fillRect(0,0,o,u),v.fillStyle=e,v.fillText(r(a)+" "+t+" ("+r(n)+"-"+r(s)+")",h,d),v.drawImage(m,c+l,u,p-l,g,c,u,p-l,g),v.fillRect(c+p-l,u,l,g),v.fillStyle=i,v.globalAlpha=.9,v.fillRect(c+p-l,u,l,r((1-a/f)*g))}}},e)}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,i),r.exports}i.m=t,i.u=t=>t+".index.js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),i.b=document.baseURI||self.location.href,(()=>{"use strict";const t=Symbol("Comlink.proxy"),e=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),s=Symbol("Comlink.thrown"),r=t=>"object"==typeof t&&null!==t||"function"==typeof t,l=new Map([["proxy",{canHandle:e=>r(e)&&e[t],serialize(t){const{port1:e,port2:i}=new MessageChannel;return o(t,e),[i,[i]]},deserialize:t=>(t.start(),h(t))}],["throw",{canHandle:t=>r(t)&&s in t,serialize({value:t}){let e;return e=t instanceof Error?{isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:{isError:!1,value:t},[e,[]]},deserialize(t){if(t.isError)throw Object.assign(new Error(t.value.message),t.value);throw t.value}}]]);function o(t,e=self){e.addEventListener("message",(function i(n){if(!n||!n.data)return;const{id:r,type:l,path:h}=Object.assign({path:[]},n.data),d=(n.data.argumentList||[]).map(f);let c;try{const e=h.slice(0,-1).reduce(((t,e)=>t[e]),t),i=h.reduce(((t,e)=>t[e]),t);switch(l){case"GET":c=i;break;case"SET":e[h.slice(-1)[0]]=f(n.data.value),c=!0;break;case"APPLY":c=i.apply(e,d);break;case"CONSTRUCT":c=m(new i(...d));break;case"ENDPOINT":{const{port1:e,port2:i}=new MessageChannel;o(t,i),c=g(e,[e])}break;case"RELEASE":c=void 0;break;default:return}}catch(t){c={value:t,[s]:0}}Promise.resolve(c).catch((t=>({value:t,[s]:0}))).then((t=>{const[n,s]=v(t);e.postMessage(Object.assign(Object.assign({},n),{id:r}),s),"RELEASE"===l&&(e.removeEventListener("message",i),a(e))}))})),e.start&&e.start()}function a(t){(function(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function h(t,e){return c(t,[],e)}function d(t){if(t)throw new Error("Proxy has been released and is not useable")}function c(t,i=[],s=function(){}){let r=!1;const l=new Proxy(s,{get(e,s){if(d(r),s===n)return()=>b(t,{type:"RELEASE",path:i.map((t=>t.toString()))}).then((()=>{a(t),r=!0}));if("then"===s){if(0===i.length)return{then:()=>l};const e=b(t,{type:"GET",path:i.map((t=>t.toString()))}).then(f);return e.then.bind(e)}return c(t,[...i,s])},set(e,n,s){d(r);const[l,o]=v(s);return b(t,{type:"SET",path:[...i,n].map((t=>t.toString())),value:l},o).then(f)},apply(n,s,l){d(r);const o=i[i.length-1];if(o===e)return b(t,{type:"ENDPOINT"}).then(f);if("bind"===o)return c(t,i.slice(0,-1));const[a,h]=u(l);return b(t,{type:"APPLY",path:i.map((t=>t.toString())),argumentList:a},h).then(f)},construct(e,n){d(r);const[s,l]=u(n);return b(t,{type:"CONSTRUCT",path:i.map((t=>t.toString())),argumentList:s},l).then(f)}});return l}function u(t){const e=t.map(v);return[e.map((t=>t[0])),(i=e.map((t=>t[1])),Array.prototype.concat.apply([],i))];var i}const p=new WeakMap;function g(t,e){return p.set(t,e),t}function m(e){return Object.assign(e,{[t]:!0})}function v(t){for(const[e,i]of l)if(i.canHandle(t)){const[n,s]=i.serialize(t);return[{type:"HANDLER",name:e,value:n},s]}return[{type:"RAW",value:t},p.get(t)||[]]}function f(t){switch(t.type){case"HANDLER":return l.get(t.name).deserialize(t.value);case"RAW":return t.value}}function b(t,e,i){return new Promise((n=>{const s=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");t.addEventListener("message",(function e(i){i.data&&i.data.id&&i.data.id===s&&(t.removeEventListener("message",e),n(i.data))})),t.start&&t.start(),t.postMessage(Object.assign({id:s},e),i)}))}var A=i(466);class w{constructor(t,e,i,n,s="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("name"),w.nextNameID=w.nextNameID||0,this.$name.id="lil-gui-name-"+ ++w.nextNameID,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),void 0!==this._onChange&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),void 0!==this._onFinishChange&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled||(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t)),this}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,void 0!==this._listenCallbackID&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class y extends w{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",(()=>{this.setValue(this.$input.checked),this._callOnFinishChange()})),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function x(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!i&&"#"+i}const _={isPrimitive:!0,match:t=>"string"==typeof t,fromHexString:x,toHexString:x},E={isPrimitive:!0,match:t=>"number"==typeof t,fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},$={isPrimitive:!1,match:Array.isArray,fromHexString(t,e,i=1){const n=E.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(255&n)/255*i},toHexString:([t,e,i],n=1)=>E.toHexString(t*(n=255/n)<<16^e*n<<8^i*n<<0)},C={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=E.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(255&n)/255*i},toHexString:({r:t,g:e,b:i},n=1)=>E.toHexString(t*(n=255/n)<<16^e*n<<8^i*n<<0)},S=[_,E,$,C];class k extends w{constructor(t,e,i,n){var s;super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(s=this.initialValue,S.find((t=>t.match(s)))),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",(()=>{this._setValueFromHexString(this.$input.value)})),this.$input.addEventListener("blur",(()=>{this._callOnFinishChange()})),this.$text.addEventListener("input",(()=>{const t=x(this.$text.value);t&&this._setValueFromHexString(t)})),this.$text.addEventListener("focus",(()=>{this._textFocused=!0,this.$text.select()})),this.$text.addEventListener("blur",(()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()})),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class L extends w{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",(t=>{t.preventDefault(),this.getValue().call(this.object)})),this.$button.addEventListener("touchstart",(()=>{}),{passive:!0}),this.$disable=this.$button}}class M extends w{constructor(t,e,i,n,s,r){super(t,e,i,"number"),this._initInput(),this.min(n),this.max(s);const l=void 0!==r;this.step(l?r:this._getImplicitStep(),l),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=100*e+"%"}return this._inputFocused||(this.$input.value=void 0===this._decimals?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=t=>{const e=parseFloat(this.$input.value);isNaN(e)||(this._snapClampSetValue(e+t),this.$input.value=this.getValue())};let e,i,n,s,r,l=!1;const o=t=>{if(l){const n=t.clientX-e,s=t.clientY-i;Math.abs(s)>5?(t.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(n)>5&&a()}if(!l){const e=t.clientY-n;r-=e*this._step*this._arrowKeyMultiplier(t),s+r>this._max?r=this._max-s:s+r<this._min&&(r=this._min-s),this._snapClampSetValue(s+r)}n=t.clientY},a=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",a)};this.$input.addEventListener("input",(()=>{let t=parseFloat(this.$input.value);isNaN(t)||(this._stepExplicit&&(t=this._snap(t)),this.setValue(this._clamp(t)))})),this.$input.addEventListener("keydown",(e=>{"Enter"===e.code&&this.$input.blur(),"ArrowUp"===e.code&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e))),"ArrowDown"===e.code&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e)*-1))})),this.$input.addEventListener("wheel",(e=>{this._inputFocused&&(e.preventDefault(),t(this._step*this._normalizeMouseWheel(e)))}),{passive:!1}),this.$input.addEventListener("mousedown",(t=>{e=t.clientX,i=n=t.clientY,l=!0,s=this.getValue(),r=0,window.addEventListener("mousemove",o),window.addEventListener("mouseup",a)})),this.$input.addEventListener("focus",(()=>{this._inputFocused=!0})),this.$input.addEventListener("blur",(()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()}))}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=t=>{const e=this.$slider.getBoundingClientRect();let i=(n=t,s=e.left,r=e.right,l=this._min,(n-s)/(r-s)*(this._max-l)+l);var n,s,r,l;this._snapClampSetValue(i)},e=e=>{t(e.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",i)};let n,s,r=!1;const l=e=>{e.preventDefault(),this._setDraggingStyle(!0),t(e.touches[0].clientX),r=!1},o=e=>{if(r){const t=e.touches[0].clientX-n,i=e.touches[0].clientY-s;Math.abs(t)>Math.abs(i)?l(e):(window.removeEventListener("touchmove",o),window.removeEventListener("touchend",a))}else e.preventDefault(),t(e.touches[0].clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",a)},h=this._callOnFinishChange.bind(this);let d;this.$slider.addEventListener("mousedown",(n=>{this._setDraggingStyle(!0),t(n.clientX),window.addEventListener("mousemove",e),window.addEventListener("mouseup",i)})),this.$slider.addEventListener("touchstart",(t=>{t.touches.length>1||(this._hasScrollBar?(n=t.touches[0].clientX,s=t.touches[0].clientY,r=!0):l(t),window.addEventListener("touchmove",o,{passive:!1}),window.addEventListener("touchend",a))}),{passive:!1}),this.$slider.addEventListener("wheel",(t=>{if(Math.abs(t.deltaX)<Math.abs(t.deltaY)&&this._hasScrollBar)return;t.preventDefault();const e=this._normalizeMouseWheel(t)*this._step;this._snapClampSetValue(this.getValue()+e),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(h,400)}),{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){const e=Math.round(t/this._step)*this._step;return parseFloat(e.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return void 0!==this._min}get _hasMax(){return void 0!==this._max}}class D extends w{constructor(t,e,i,n){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(n)?n:Object.values(n),this._names=Array.isArray(n)?n:Object.keys(n),this._names.forEach((t=>{const e=document.createElement("option");e.innerHTML=t,this.$select.appendChild(e)})),this.$select.addEventListener("change",(()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()})),this.$select.addEventListener("focus",(()=>{this.$display.classList.add("focus")})),this.$select.addEventListener("blur",(()=>{this.$display.classList.remove("focus")})),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.innerHTML=-1===e?t:this._names[e],this}}class F extends w{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",(()=>{this.setValue(this.$input.value)})),this.$input.addEventListener("keydown",(t=>{"Enter"===t.code&&this.$input.blur()})),this.$input.addEventListener("blur",(()=>{this._callOnFinishChange()})),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let V=!1;class H{constructor({parent:t,autoPlace:e=void 0===t,container:i,width:n,title:s="Controls",injectStyles:r=!0,touchStyles:l=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",(()=>this.openAnimated(this._closed))),this.$title.addEventListener("keydown",(t=>{"Enter"!==t.code&&"Space"!==t.code||(t.preventDefault(),this.$title.click())})),this.$title.addEventListener("touchstart",(()=>{}),{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),l&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!V&&r&&(function(t){const e=document.createElement("style");e.innerHTML='.lil-gui {\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n  line-height: 1;\n  font-weight: normal;\n  font-style: normal;\n  text-align: left;\n  background-color: var(--background-color);\n  color: var(--text-color);\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  --background-color: #1f1f1f;\n  --text-color: #ebebeb;\n  --title-background-color: #111111;\n  --title-text-color: #ebebeb;\n  --widget-color: #424242;\n  --hover-color: #4f4f4f;\n  --focus-color: #595959;\n  --number-color: #2cc9ff;\n  --string-color: #a2db3c;\n  --font-size: 11px;\n  --input-font-size: 11px;\n  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;\n  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;\n  --padding: 4px;\n  --spacing: 4px;\n  --widget-height: 20px;\n  --name-width: 45%;\n  --slider-knob-width: 2px;\n  --slider-input-width: 27%;\n  --color-input-width: 27%;\n  --slider-input-min-width: 45px;\n  --color-input-min-width: 45px;\n  --folder-indent: 7px;\n  --widget-padding: 0 0 0 3px;\n  --widget-border-radius: 2px;\n  --checkbox-size: calc(0.75 * var(--widget-height));\n  --scrollbar-width: 5px;\n}\n.lil-gui, .lil-gui * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.lil-gui.root {\n  width: var(--width, 245px);\n  display: flex;\n  flex-direction: column;\n}\n.lil-gui.root > .title {\n  background: var(--title-background-color);\n  color: var(--title-text-color);\n}\n.lil-gui.root > .children {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.lil-gui.root > .children::-webkit-scrollbar {\n  width: var(--scrollbar-width);\n  height: var(--scrollbar-width);\n  background: var(--background-color);\n}\n.lil-gui.root > .children::-webkit-scrollbar-thumb {\n  border-radius: var(--scrollbar-width);\n  background: var(--focus-color);\n}\n@media (pointer: coarse) {\n  .lil-gui.allow-touch-styles {\n    --widget-height: 28px;\n    --padding: 6px;\n    --spacing: 6px;\n    --font-size: 13px;\n    --input-font-size: 16px;\n    --folder-indent: 10px;\n    --scrollbar-width: 7px;\n    --slider-input-min-width: 50px;\n    --color-input-min-width: 65px;\n  }\n}\n.lil-gui.force-touch-styles {\n  --widget-height: 28px;\n  --padding: 6px;\n  --spacing: 6px;\n  --font-size: 13px;\n  --input-font-size: 16px;\n  --folder-indent: 10px;\n  --scrollbar-width: 7px;\n  --slider-input-min-width: 50px;\n  --color-input-min-width: 65px;\n}\n.lil-gui.autoPlace {\n  max-height: 100%;\n  position: fixed;\n  top: 0;\n  right: 15px;\n  z-index: 1001;\n}\n\n.lil-gui .controller {\n  display: flex;\n  align-items: center;\n  padding: 0 var(--padding);\n  margin: var(--spacing) 0;\n}\n.lil-gui .controller.disabled {\n  opacity: 0.5;\n}\n.lil-gui .controller.disabled, .lil-gui .controller.disabled * {\n  pointer-events: none !important;\n}\n.lil-gui .controller > .name {\n  min-width: var(--name-width);\n  flex-shrink: 0;\n  white-space: pre;\n  padding-right: var(--spacing);\n  line-height: var(--widget-height);\n}\n.lil-gui .controller .widget {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: var(--widget-height);\n}\n.lil-gui .controller.string input {\n  color: var(--string-color);\n}\n.lil-gui .controller.boolean .widget {\n  cursor: pointer;\n}\n.lil-gui .controller.color .display {\n  width: 100%;\n  height: var(--widget-height);\n  border-radius: var(--widget-border-radius);\n  position: relative;\n}\n@media (hover: hover) {\n  .lil-gui .controller.color .display:hover:before {\n    content: " ";\n    display: block;\n    position: absolute;\n    border-radius: var(--widget-border-radius);\n    border: 1px solid #fff9;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n}\n.lil-gui .controller.color input[type=color] {\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.lil-gui .controller.color input[type=text] {\n  margin-left: var(--spacing);\n  font-family: var(--font-family-mono);\n  min-width: var(--color-input-min-width);\n  width: var(--color-input-width);\n  flex-shrink: 0;\n}\n.lil-gui .controller.option select {\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n  max-width: 100%;\n}\n.lil-gui .controller.option .display {\n  position: relative;\n  pointer-events: none;\n  border-radius: var(--widget-border-radius);\n  height: var(--widget-height);\n  line-height: var(--widget-height);\n  max-width: 100%;\n  overflow: hidden;\n  word-break: break-all;\n  padding-left: 0.55em;\n  padding-right: 1.75em;\n  background: var(--widget-color);\n}\n@media (hover: hover) {\n  .lil-gui .controller.option .display.focus {\n    background: var(--focus-color);\n  }\n}\n.lil-gui .controller.option .display.active {\n  background: var(--focus-color);\n}\n.lil-gui .controller.option .display:after {\n  font-family: "lil-gui";\n  content: "↕";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  padding-right: 0.375em;\n}\n.lil-gui .controller.option .widget,\n.lil-gui .controller.option select {\n  cursor: pointer;\n}\n@media (hover: hover) {\n  .lil-gui .controller.option .widget:hover .display {\n    background: var(--hover-color);\n  }\n}\n.lil-gui .controller.number input {\n  color: var(--number-color);\n}\n.lil-gui .controller.number.hasSlider input {\n  margin-left: var(--spacing);\n  width: var(--slider-input-width);\n  min-width: var(--slider-input-min-width);\n  flex-shrink: 0;\n}\n.lil-gui .controller.number .slider {\n  width: 100%;\n  height: var(--widget-height);\n  background-color: var(--widget-color);\n  border-radius: var(--widget-border-radius);\n  padding-right: var(--slider-knob-width);\n  overflow: hidden;\n  cursor: ew-resize;\n  touch-action: pan-y;\n}\n@media (hover: hover) {\n  .lil-gui .controller.number .slider:hover {\n    background-color: var(--hover-color);\n  }\n}\n.lil-gui .controller.number .slider.active {\n  background-color: var(--focus-color);\n}\n.lil-gui .controller.number .slider.active .fill {\n  opacity: 0.95;\n}\n.lil-gui .controller.number .fill {\n  height: 100%;\n  border-right: var(--slider-knob-width) solid var(--number-color);\n  box-sizing: content-box;\n}\n\n.lil-gui-dragging .lil-gui {\n  --hover-color: var(--widget-color);\n}\n.lil-gui-dragging * {\n  cursor: ew-resize !important;\n}\n\n.lil-gui-dragging.lil-gui-vertical * {\n  cursor: ns-resize !important;\n}\n\n.lil-gui .title {\n  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);\n  height: var(--title-height);\n  line-height: calc(var(--title-height) - 4px);\n  font-weight: 600;\n  padding: 0 var(--padding);\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  outline: none;\n  text-decoration-skip: objects;\n}\n.lil-gui .title:before {\n  font-family: "lil-gui";\n  content: "▾";\n  padding-right: 2px;\n  display: inline-block;\n}\n.lil-gui .title:active {\n  background: var(--title-background-color);\n  opacity: 0.75;\n}\n@media (hover: hover) {\n  body:not(.lil-gui-dragging) .lil-gui .title:hover {\n    background: var(--title-background-color);\n    opacity: 0.85;\n  }\n  .lil-gui .title:focus {\n    text-decoration: underline var(--focus-color);\n  }\n}\n.lil-gui.root > .title:focus {\n  text-decoration: none !important;\n}\n.lil-gui.closed > .title:before {\n  content: "▸";\n}\n.lil-gui.closed > .children {\n  transform: translateY(-7px);\n  opacity: 0;\n}\n.lil-gui.closed:not(.transition) > .children {\n  display: none;\n}\n.lil-gui.transition > .children {\n  transition-duration: 300ms;\n  transition-property: height, opacity, transform;\n  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);\n  overflow: hidden;\n  pointer-events: none;\n}\n.lil-gui .children:empty:before {\n  content: "Empty";\n  padding: 0 var(--padding);\n  margin: var(--spacing) 0;\n  display: block;\n  height: var(--widget-height);\n  font-style: italic;\n  line-height: var(--widget-height);\n  opacity: 0.5;\n}\n.lil-gui.root > .children > .lil-gui > .title {\n  border: 0 solid var(--widget-color);\n  border-width: 1px 0;\n  transition: border-color 300ms;\n}\n.lil-gui.root > .children > .lil-gui.closed > .title {\n  border-bottom-color: transparent;\n}\n.lil-gui + .controller {\n  border-top: 1px solid var(--widget-color);\n  margin-top: 0;\n  padding-top: var(--spacing);\n}\n.lil-gui .lil-gui .lil-gui > .title {\n  border: none;\n}\n.lil-gui .lil-gui .lil-gui > .children {\n  border: none;\n  margin-left: var(--folder-indent);\n  border-left: 2px solid var(--widget-color);\n}\n.lil-gui .lil-gui .controller {\n  border: none;\n}\n\n.lil-gui input {\n  -webkit-tap-highlight-color: transparent;\n  border: 0;\n  outline: none;\n  font-family: var(--font-family);\n  font-size: var(--input-font-size);\n  border-radius: var(--widget-border-radius);\n  height: var(--widget-height);\n  background: var(--widget-color);\n  color: var(--text-color);\n  width: 100%;\n}\n@media (hover: hover) {\n  .lil-gui input:hover {\n    background: var(--hover-color);\n  }\n  .lil-gui input:active {\n    background: var(--focus-color);\n  }\n}\n.lil-gui input:disabled {\n  opacity: 1;\n}\n.lil-gui input[type=text],\n.lil-gui input[type=number] {\n  padding: var(--widget-padding);\n}\n.lil-gui input[type=text]:focus,\n.lil-gui input[type=number]:focus {\n  background: var(--focus-color);\n}\n.lil-gui input::-webkit-outer-spin-button,\n.lil-gui input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.lil-gui input[type=number] {\n  -moz-appearance: textfield;\n}\n.lil-gui input[type=checkbox] {\n  appearance: none;\n  -webkit-appearance: none;\n  height: var(--checkbox-size);\n  width: var(--checkbox-size);\n  border-radius: var(--widget-border-radius);\n  text-align: center;\n  cursor: pointer;\n}\n.lil-gui input[type=checkbox]:checked:before {\n  font-family: "lil-gui";\n  content: "✓";\n  font-size: var(--checkbox-size);\n  line-height: var(--checkbox-size);\n}\n@media (hover: hover) {\n  .lil-gui input[type=checkbox]:focus {\n    box-shadow: inset 0 0 0 1px var(--focus-color);\n  }\n}\n.lil-gui button {\n  -webkit-tap-highlight-color: transparent;\n  outline: none;\n  cursor: pointer;\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n  color: var(--text-color);\n  width: 100%;\n  height: var(--widget-height);\n  text-transform: none;\n  background: var(--widget-color);\n  border-radius: var(--widget-border-radius);\n  border: 1px solid var(--widget-color);\n  text-align: center;\n  line-height: calc(var(--widget-height) - 4px);\n}\n@media (hover: hover) {\n  .lil-gui button:hover {\n    background: var(--hover-color);\n    border-color: var(--hover-color);\n  }\n  .lil-gui button:focus {\n    border-color: var(--focus-color);\n  }\n}\n.lil-gui button:active {\n  background: var(--focus-color);\n}\n\n@font-face {\n  font-family: "lil-gui";\n  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");\n}';const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}(),V=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this.domElement.addEventListener("keydown",(t=>t.stopPropagation())),this.domElement.addEventListener("keyup",(t=>t.stopPropagation()))}add(t,e,i,n,s){if(Object(i)===i)return new D(this,t,e,i);const r=t[e];switch(typeof r){case"number":return new M(this,t,e,i,n,s);case"boolean":return new y(this,t,e);case"string":return new F(this,t,e);case"function":return new L(this,t,e)}console.error("gui.add failed\n\tproperty:",e,"\n\tobject:",t,"\n\tvalue:",r)}addColor(t,e,i=1){return new k(this,t,e,i)}addFolder(t){return new H({parent:this,title:t})}load(t,e=!0){return t.controllers&&this.controllers.forEach((e=>{e instanceof L||e._name in t.controllers&&e.load(t.controllers[e._name])})),e&&t.folders&&this.folders.forEach((e=>{e._title in t.folders&&e.load(t.folders[e._title])})),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach((t=>{if(!(t instanceof L)){if(t._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);e.controllers[t._name]=t.save()}})),t&&this.folders.forEach((t=>{if(t._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);e.folders[t._title]=t.save()})),e}open(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame((()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=t=>{t.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame((()=>{this.$children.style.height=n+"px"}))})),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach((t=>t.reset())),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),void 0!==this._onChange&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),void 0!==this._onFinishChange&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach((t=>t.destroy()))}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach((e=>{t=t.concat(e.controllersRecursive())})),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach((e=>{t=t.concat(e.foldersRecursive())})),t}}const O=H;(async()=>{const t=t=>document.getElementById(t),e=window.matchMedia("(prefers-color-scheme: dark)").matches,n=t("canvas");if(!await(async t=>{try{return"undefined"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(t)}catch(t){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))||!HTMLCanvasElement.prototype.transferControlToOffscreen){const t="Required features not supported";console.error(t);const i=n.getContext("2d");return i.font="13px monospace",i.fillStyle=e?"white":"black",void i.fillText(t,0,20)}const s=await h(new Worker(new URL(i.p+i.u(310),i.b),{type:void 0})).handlers,r=new A;r.dom.style.position="absolute";const l=r.addPanel(new A.Panel("MS (Sim)","#ff8","#221"));r.showPanel(3),t("container").appendChild(r.dom);const o=new O({autoPlace:!1});o.domElement.style.opacity="0.9";let a={threads:await s.numThreads,particles:0,block:async()=>{c(await s.addBlock())},reset:async()=>{c(await s.reset())}};const d=o.add(a,"particles").disable(),c=t=>{a.particles=t,d.updateDisplay()};o.add(a,"threads").disable(),o.add(a,"block").name("add block"),o.add(a,"reset").name("reset simulation"),t("gui").appendChild(o.domElement);const u=n.transferControlToOffscreen(),p=await s.init(g(u,[u]),m(r),m(l),e);c(p)})()})()})();