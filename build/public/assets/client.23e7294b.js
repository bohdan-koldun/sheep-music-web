!function(e){function t(t){for(var r,i,u=t[0],c=t[1],l=t[2],f=0,p=[];f<u.length;f++)i=u[f],o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={11:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=r);var a=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=i.p+""+({0:"about~admin~contact~home~login~not-found~privacy~register",1:"vendors~about~admin~contact~home~login~not-found~privacy~register",2:"not-found",3:"admin",4:"privacy",5:"about",6:"register",7:"login",8:"contact",9:"home"}[e]||e)+"."+{0:"5a29162f",1:"3a5c3474",2:"61027479",3:"a9e64d66",4:"5a1bf57e",5:"f4a7ed14",6:"4721f5e5",7:"30523a9e",8:"bb2bb1b5",9:"2634847f"}[e]+".chunk.js";var c=setTimeout(function(){l({type:"timeout",target:u})},12e4);function l(t){u.onerror=u.onload=null,clearTimeout(c);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[e]=void 0}}u.onerror=u.onload=l,a.appendChild(u)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/assets/",i.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=c;a.push([372,10]),n()}({147:function(e,t,n){"use strict";n.r(t);n(172);var r=n(19),o=n.n(r),a=n(100),i=n.n(a),u=(n(161),n(146)),c=n.n(u),l=n(70),s=n(10),f=n.n(s),p=n(140);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){v(e,t,n[t])})}return e}({insertCss:f.a.func.isRequired,fetch:f.a.func.isRequired,pathname:f.a.string.isRequired,query:f.a.object},p.a.childContextTypes),m=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),y(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.a.PureComponent),n=t,(r=[{key:"getChildContext",value:function(){return this.props.context}},{key:"render",value:function(){return o.a.Children.only(this.props.children)}}])&&h(n.prototype,r),a&&h(n,a),t}();Object.defineProperty(m,"childContextTypes",{configurable:!0,enumerable:!0,writable:!0,value:b});var w=m;function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){O(e,t,n[t])})}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var P=function(e,t){var n=t.baseUrl,r=t.cookie,o=t.schema,a=t.graphql,i={method:"POST",mode:n?"cors":"same-origin",credentials:n?"include":"same-origin",headers:g({Accept:"application/json","Content-Type":"application/json"},r?{Cookie:r}:null)};return u=regeneratorRuntime.mark(function t(r,u){var c,l,s;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(c=r.startsWith("/graphql"),!(o&&a&&c)){t.next=7;break}return l=JSON.parse(u.body),t.next=5,a(o,l.query,{request:{}},null,l.variables);case 5:return s=t.sent,t.abrupt("return",Promise.resolve({status:s.errors?400:200,json:function(){return Promise.resolve(s)}}));case 7:return t.abrupt("return",c||r.startsWith("/api")?e("".concat(n).concat(r),g({},i,u,{headers:g({},i.headers,u&&u.headers)})):e(r,u));case 8:case"end":return t.stop()}},t,this)}),c=function(){var e=this,t=arguments;return new Promise(function(n,r){var o=u.apply(e,t);function a(e,t){try{var a=o[e](t),u=a.value}catch(e){return void r(e)}a.done?n(u):Promise.resolve(u).then(i,c)}function i(e){a("next",e)}function c(e){a("throw",e)}i()})},function(e,t){return c.apply(this,arguments)};var u,c},j=n(33),x=n(144),k=n.n(x);n(154),n(153);var S="SET_RUNTIME_VARIABLE";function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=Object(j.combineReducers)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(arguments.length>1?arguments[1]:void 0).type,e},runtime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case S:return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){R(e,t,n[t])})}return e}({},e,R({},t.payload.name,t.payload.value));default:return e}}});function C(e){return function(){var t,n=(t=regeneratorRuntime.mark(function t(n,r){var o,a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o={method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({query:n,variables:r}),credentials:"include"},t.next=3,e("/graphql",o);case 3:if(200===(a=t.sent).status){t.next=6;break}throw new Error(a.statusText);case 6:return t.abrupt("return",a.json());case 7:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(e,t){try{var n=a[e](t),i=n.value}catch(e){return void o(e)}n.done?r(i):Promise.resolve(i).then(u,c)}function u(e){i("next",e)}function c(e){i("throw",e)}u()})});return function(e,t){return n.apply(this,arguments)}}()}n(143);var _=n(52);function q(e,t,n,r,o){var a=document.head.querySelector("".concat(e,"[").concat(t,'="').concat(n,'"]'));if((!a||a.getAttribute(r)!==o)&&(a&&a.parentNode.removeChild(a),"string"==typeof o)){var i=document.createElement(e);i.setAttribute(t,n),i.setAttribute(r,o),document.head.appendChild(i)}}var T,A,B=n(141);var N,U={path:"",children:[{path:"",load:function(){return Promise.all([n.e(1),n.e(0),n.e(9)]).then(n.bind(null,508))}},{path:"/contact",load:function(){return Promise.all([n.e(1),n.e(0),n.e(8)]).then(n.bind(null,511))}},{path:"/login",load:function(){return Promise.all([n.e(1),n.e(0),n.e(7)]).then(n.bind(null,507))}},{path:"/register",load:function(){return Promise.all([n.e(1),n.e(0),n.e(6)]).then(n.bind(null,509))}},{path:"/about",load:function(){return Promise.all([n.e(1),n.e(0),n.e(5)]).then(n.bind(null,513))}},{path:"/privacy",load:function(){return Promise.all([n.e(1),n.e(0),n.e(4)]).then(n.bind(null,512))}},{path:"/admin",load:function(){return Promise.all([n.e(1),n.e(0),n.e(3)]).then(n.bind(null,510))}},{path:"(.*)",load:function(){return Promise.all([n.e(1),n.e(0),n.e(2)]).then(n.bind(null,506))}}],action:(T=regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.next,e.next=3,n();case 3:return(r=e.sent).title="".concat(r.title||"Untitled Page"," - www.reactstarterkit.com"),r.description=r.description||"",e.abrupt("return",r);case 7:case"end":return e.stop()}},e,this)}),A=function(){var e=this,t=arguments;return new Promise(function(n,r){var o=T.apply(e,t);function a(e,t){try{var a=o[e](t),c=a.value}catch(e){return void r(e)}a.done?n(c):Promise.resolve(c).then(i,u)}function i(e){a("next",e)}function u(e){a("throw",e)}i()})},function(e){return A.apply(this,arguments)})},I=new B.a(U,{resolveRoute:function(e,t){return"function"==typeof e.route.load?e.route.load().then(function(n){return n.default(e,t)}):"function"==typeof e.route.action?e.route.action(e,t):void 0}});function J(e,t,n,r){N||(N="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&o)for(var i in o)void 0===t[i]&&(t[i]=o[i]);else t||(t=o||{});if(1===a)t.children=r;else if(a>1){for(var u=new Array(a),c=0;c<a;c++)u[c]=arguments[c+3];t.children=u}return{$$typeof:N,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var M={insertCss:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.map(function(e){return e._insertCss()});return function(){r.forEach(function(e){return e()})}},fetch:P(fetch,{baseUrl:window.App.apiUrl}),store:function(e,t){var n,r,o,a={fetch:r=(n=t).fetch,history:n.history,graphqlRequest:C(r)},i=[k.a.withExtraArgument(a)];return o=j.applyMiddleware.apply(void 0,i),Object(j.createStore)(E,e,o)}(window.App.state,{history:_.a}),storeSubscription:null},Y=document.getElementById("app"),D=_.a.location,X={};function L(e,t){return W.apply(this,arguments)}function W(){var e;return e=regeneratorRuntime.mark(function e(t,n){var r,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return X[D.key]={scrollX:window.pageXOffset,scrollY:window.pageYOffset},"PUSH"===n&&delete X[t.key],D=t,r=!n,e.prev=4,M.pathname=t.pathname,M.query=c.a.parse(t.search),e.next=9,I.resolve(M);case 9:if(o=e.sent,D.key===t.key){e.next=12;break}return e.abrupt("return");case 12:if(!o.redirect){e.next=15;break}return _.a.replace(o.redirect),e.abrupt("return");case 15:a=r?i.a.hydrate:i.a.render,a(J(w,{context:M},void 0,o.component),Y,function(){if(r){window.history&&"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var e=document.getElementById("css");e&&e.parentNode.removeChild(e)}else{var n,a;document.title=o.title,n="description",a=o.description,q("meta","name",n,"content",a);var i=0,u=0,c=X[t.key];if(c)i=c.scrollX,u=c.scrollY;else{var s=t.hash.substr(1);if(s){var f=document.getElementById(s);f&&(u=window.pageYOffset+f.getBoundingClientRect().top)}}window.scrollTo(i,u),window.ga&&window.ga("send","pageview",Object(l.createPath)(t))}}),e.next=25;break;case 19:e.prev=19,e.t0=e.catch(4),e.next=23;break;case 23:console.error(e.t0),r||D.key!==t.key||(console.error("RSK will reload your page after error"),window.location.reload());case 25:case"end":return e.stop()}},e,this,[[4,19]])}),(W=function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e,t){try{var n=a[e](t),i=n.value}catch(e){return void o(e)}n.done?r(i):Promise.resolve(i).then(u,c)}function u(e){i("next",e)}function c(e){i("throw",e)}u()})}).apply(this,arguments)}_.a.listen(L),L(D)},153:function(e){e.exports={}},372:function(e,t,n){n(371),e.exports=n(147)},52:function(e,t,n){"use strict";var r=n(142),o=n.n(r);t.a=o()()}});
//# sourceMappingURL=client.23e7294b.js.map