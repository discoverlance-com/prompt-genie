(()=>{var Ce=()=>{};var Re=function(t){let e=[],n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},pt=function(t){let e=[],n=0,s=0;for(;n<t.length;){let i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=t[n++];e[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=t[n++],r=t[n++],a=t[n++],l=((i&7)<<18|(o&63)<<12|(r&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{let o=t[n++],r=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|r&63)}}return e.join("")},Ae={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){let o=t[i],r=i+1<t.length,a=r?t[i+1]:0,l=i+2<t.length,u=l?t[i+2]:0,E=o>>2,S=(o&3)<<4|a>>4,C=(a&15)<<2|u>>6,p=u&63;l||(p=64,r||(C=64)),s.push(n[E],n[S],n[C],n[p])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Re(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):pt(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){let o=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;let u=i<t.length?n[t.charAt(i)]:64;++i;let S=i<t.length?n[t.charAt(i)]:64;if(++i,o==null||a==null||u==null||S==null)throw new K;let C=o<<2|a>>4;if(s.push(C),u!==64){let p=a<<4&240|u>>2;if(s.push(p),S!==64){let g=u<<6&192|S;s.push(g)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},K=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},gt=function(t){let e=Re(t);return Ae.encodeByteArray(e,!0)},q=function(t){return gt(t).replace(/\./g,"")},Ie=function(t){try{return Ae.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function mt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Et=()=>mt().__FIREBASE_DEFAULTS__,bt=()=>{if(typeof process>"u"||typeof process.env>"u")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yt=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&Ie(t[1]);return e&&JSON.parse(e)},_t=()=>{try{return Ce()||Et()||bt()||yt()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}};var X=()=>_t()?.config;var P=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}};function Te(){try{return typeof indexedDB=="object"}catch{return!1}}function ve(){return new Promise((t,e)=>{try{let n=!0,s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}var wt="FirebaseError",b=class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=wt,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,M.prototype.create)}},M=class{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){let s=n[0]||{},i=`${this.service}/${e}`,o=this.errors[e],r=o?St(o,s):"Error",a=`${this.serviceName}: ${r} (${i}).`;return new b(i,a,s)}};function St(t,e){return t.replace(Ct,(n,s)=>{let i=e[s];return i!=null?String(i):`<${s}?>`})}var Ct=/\{\$([^}]+)}/g;function $(t,e){if(t===e)return!0;let n=Object.keys(t),s=Object.keys(e);for(let i of n){if(!s.includes(i))return!1;let o=t[i],r=e[i];if(Oe(o)&&Oe(r)){if(!$(o,r))return!1}else if(o!==r)return!1}for(let i of s)if(!n.includes(i))return!1;return!0}function Oe(t){return t!==null&&typeof t=="object"}var fs=14400*1e3;function De(t){return t&&t._delegate?t._delegate:t}var y=class{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var I="[DEFAULT]";var Q=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let s=new P;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){let n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rt(e))try{this.getOrInitializeService({instanceIdentifier:I})}catch{}for(let[n,s]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let o=this.getOrInitializeService({instanceIdentifier:i});s.resolve(o)}catch{}}}}clearInstance(e=I){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=I){return this.instances.has(e)}getOptions(e=I){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(let[o,r]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(o);s===a&&r.resolve(i)}return i}onInit(e,n){let s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);let o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){let s=this.onInitCallbacks.get(n);if(s)for(let i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ot(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=I){return this.component?this.component.multipleInstances?e:I:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Ot(t){return t===I?void 0:t}function Rt(t){return t.instantiationMode==="EAGER"}var H=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new Q(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var At=[],f;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(f||(f={}));var It={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},Tt=f.INFO,vt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},Dt=(t,e,...n)=>{if(e<t.logLevel)return;let s=new Date().toISOString(),i=vt[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},N=class{constructor(e){this.name=e,this._logLevel=Tt,this._logHandler=Dt,this._userLogHandler=null,At.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in f))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?It[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...e),this._logHandler(this,f.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...e),this._logHandler(this,f.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,f.INFO,...e),this._logHandler(this,f.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,f.WARN,...e),this._logHandler(this,f.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...e),this._logHandler(this,f.ERROR,...e)}};var Nt=(t,e)=>e.some(n=>t instanceof n),Ne,Le;function Lt(){return Ne||(Ne=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kt(){return Le||(Le=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ke=new WeakMap,ee=new WeakMap,Pe=new WeakMap,Z=new WeakMap,ne=new WeakMap;function Pt(t){let e=new Promise((n,s)=>{let i=()=>{t.removeEventListener("success",o),t.removeEventListener("error",r)},o=()=>{n(m(t.result)),i()},r=()=>{s(t.error),i()};t.addEventListener("success",o),t.addEventListener("error",r)});return e.then(n=>{n instanceof IDBCursor&&ke.set(n,t)}).catch(()=>{}),ne.set(e,t),e}function Mt(t){if(ee.has(t))return;let e=new Promise((n,s)=>{let i=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",r),t.removeEventListener("abort",r)},o=()=>{n(),i()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",o),t.addEventListener("error",r),t.addEventListener("abort",r)});ee.set(t,e)}var te={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ee.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Pe.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Me(t){te=t(te)}function xt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let s=t.call(V(this),e,...n);return Pe.set(s,e.sort?e.sort():[e]),m(s)}:kt().includes(t)?function(...e){return t.apply(V(this),e),m(ke.get(this))}:function(...e){return m(t.apply(V(this),e))}}function Bt(t){return typeof t=="function"?xt(t):(t instanceof IDBTransaction&&Mt(t),Nt(t,Lt())?new Proxy(t,te):t)}function m(t){if(t instanceof IDBRequest)return Pt(t);if(Z.has(t))return Z.get(t);let e=Bt(t);return e!==t&&(Z.set(t,e),ne.set(e,t)),e}var V=t=>ne.get(t);function Be(t,e,{blocked:n,upgrade:s,blocking:i,terminated:o}={}){let r=indexedDB.open(t,e),a=m(r);return s&&r.addEventListener("upgradeneeded",l=>{s(m(r.result),l.oldVersion,l.newVersion,m(r.transaction),l)}),n&&r.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}var Ut=["get","getKey","getAll","getAllKeys","count"],Ft=["put","add","delete","clear"],se=new Map;function xe(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(se.get(e))return se.get(e);let n=e.replace(/FromIndex$/,""),s=e!==n,i=Ft.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Ut.includes(n)))return;let o=async function(r,...a){let l=this.transaction(r,i?"readwrite":"readonly"),u=l.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&l.done]))[0]};return se.set(e,o),o}Me(t=>({...t,get:(e,n,s)=>xe(e,n)||t.get(e,n,s),has:(e,n)=>!!xe(e,n)||t.has(e,n)}));var oe=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if($t(n)){let s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}};function $t(t){return t.getComponent()?.type==="VERSION"}var re="@firebase/app",Ue="0.14.4";var _=new N("@firebase/app"),Ht="@firebase/app-compat",Vt="@firebase/analytics-compat",Gt="@firebase/analytics",jt="@firebase/app-check-compat",Wt="@firebase/app-check",zt="@firebase/auth",Yt="@firebase/auth-compat",Jt="@firebase/database",Kt="@firebase/data-connect",qt="@firebase/database-compat",Xt="@firebase/functions",Qt="@firebase/functions-compat",Zt="@firebase/installations",en="@firebase/installations-compat",tn="@firebase/messaging",nn="@firebase/messaging-compat",sn="@firebase/performance",on="@firebase/performance-compat",rn="@firebase/remote-config",an="@firebase/remote-config-compat",cn="@firebase/storage",ln="@firebase/storage-compat",dn="@firebase/firestore",un="@firebase/ai",fn="@firebase/firestore-compat",hn="firebase";var ae="[DEFAULT]",pn={[re]:"fire-core",[Ht]:"fire-core-compat",[Gt]:"fire-analytics",[Vt]:"fire-analytics-compat",[Wt]:"fire-app-check",[jt]:"fire-app-check-compat",[zt]:"fire-auth",[Yt]:"fire-auth-compat",[Jt]:"fire-rtdb",[Kt]:"fire-data-connect",[qt]:"fire-rtdb-compat",[Xt]:"fire-fn",[Qt]:"fire-fn-compat",[Zt]:"fire-iid",[en]:"fire-iid-compat",[tn]:"fire-fcm",[nn]:"fire-fcm-compat",[sn]:"fire-perf",[on]:"fire-perf-compat",[rn]:"fire-rc",[an]:"fire-rc-compat",[cn]:"fire-gcs",[ln]:"fire-gcs-compat",[dn]:"fire-fst",[fn]:"fire-fst-compat",[un]:"fire-vertex","fire-js":"fire-js",[hn]:"fire-js-all"};var x=new Map,gn=new Map,ce=new Map;function Fe(t,e){try{t.container.addComponent(e)}catch(n){_.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function B(t){let e=t.name;if(ce.has(e))return _.debug(`There were multiple attempts to register component ${e}.`),!1;ce.set(e,t);for(let n of x.values())Fe(n,t);for(let n of gn.values())Fe(n,t);return!0}function Ge(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function je(t){return t==null?!1:t.settings!==void 0}var mn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},O=new M("app","Firebase",mn);var le=class{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new y("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw O.create("app-deleted",{appName:this._name})}};function fe(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let s={name:ae,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw O.create("bad-app-name",{appName:String(i)});if(n||(n=X()),!n)throw O.create("no-options");let o=x.get(i);if(o){if($(n,o.options)&&$(s,o.config))return o;throw O.create("duplicate-app",{appName:i})}let r=new H(i);for(let l of ce.values())r.addComponent(l);let a=new le(n,s,r);return x.set(i,a),a}function G(t=ae){let e=x.get(t);if(!e&&t===ae&&X())return fe();if(!e)throw O.create("no-app",{appName:t});return e}function We(){return Array.from(x.values())}function R(t,e,n){let s=pn[t]??t;n&&(s+=`-${n}`);let i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){let r=[`Unable to register library "${s}" with version "${e}":`];i&&r.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&r.push("and"),o&&r.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_.warn(r.join(" "));return}B(new y(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var En="firebase-heartbeat-database",bn=1,U="firebase-heartbeat-store",ie=null;function ze(){return ie||(ie=Be(En,bn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(U)}catch(n){console.warn(n)}}}}).catch(t=>{throw O.create("idb-open",{originalErrorMessage:t.message})})),ie}async function yn(t){try{let n=(await ze()).transaction(U),s=await n.objectStore(U).get(Ye(t));return await n.done,s}catch(e){if(e instanceof b)_.warn(e.message);else{let n=O.create("idb-get",{originalErrorMessage:e?.message});_.warn(n.message)}}}async function $e(t,e){try{let s=(await ze()).transaction(U,"readwrite");await s.objectStore(U).put(e,Ye(t)),await s.done}catch(n){if(n instanceof b)_.warn(n.message);else{let s=O.create("idb-set",{originalErrorMessage:n?.message});_.warn(s.message)}}}function Ye(t){return`${t.name}!${t.options.appId}`}var _n=1024,wn=30,de=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new ue(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=He();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>wn){let i=Cn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=He(),{heartbeatsToSend:n,unsentEntries:s}=Sn(this._heartbeatsCache.heartbeats),i=q(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return _.warn(e),""}}};function He(){return new Date().toISOString().substring(0,10)}function Sn(t,e=_n){let n=[],s=t.slice();for(let i of t){let o=n.find(r=>r.agent===i.agent);if(o){if(o.dates.push(i.date),Ve(n)>e){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ve(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}var ue=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Te()?ve().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await yn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let s=await this.read();return $e(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let s=await this.read();return $e(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function Ve(t){return q(JSON.stringify({version:2,heartbeats:t})).length}function Cn(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}function On(t){B(new y("platform-logger",e=>new oe(e),"PRIVATE")),B(new y("heartbeat",e=>new de(e),"PRIVATE")),R(re,Ue,t),R(re,Ue,"esm2020"),R("fire-js","")}On("");var Rn="firebase",An="12.4.0";R(Rn,An,"app");var Je="@firebase/ai",pe="2.4.0";var L="AI",Ke="us-central1",In="firebasevertexai.googleapis.com",Tn="v1beta",qe=pe,vn="gl-js",Dn=180*1e3,Nn="gemini-2.0-flash-lite";var d=class t extends b{constructor(e,n,s){let i=L,o=`${i}/${e}`,r=`${i}: ${n} (${o})`;super(e,r),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,t),Object.setPrototypeOf(this,t.prototype),this.toString=()=>r}};var Xe=["user","model","function","system"];var it={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var Qe={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL"};var v={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"};var c={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var w={VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};var W=class{constructor(e){this.backendType=e}},A=class extends W{constructor(){super(w.GOOGLE_AI)}},k=class extends W{constructor(e=Ke){super(w.VERTEX_AI),e?this.location=e:this.location=Ke}};function Ln(t){if(t instanceof A)return`${L}/googleai`;if(t instanceof k)return`${L}/vertexai/${t.location}`;throw new d(c.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function kn(t){let e=t.split("/");if(e[0]!==L)throw new d(c.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":let s=e[2];if(!s)throw new d(c.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new k(s);case"googleai":return new A;default:throw new d(c.ERROR,`Invalid instance identifier string: '${t}'`)}}var h=new N("@firebase/vertexai"),T;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(T||(T={}));var z=class t{constructor(e,n,s={createOptions:{expectedInputs:[{type:"image"}]}}){this.languageModelProvider=e,this.mode=n,this.onDeviceParams=s,this.isDownloading=!1}async isAvailable(e){if(!this.mode)return h.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===v.ONLY_IN_CLOUD)return h.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let n=await this.downloadIfAvailable();if(this.mode===v.ONLY_ON_DEVICE){if(n===T.UNAVAILABLE)throw new d(c.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");return(n===T.DOWNLOADABLE||n===T.DOWNLOADING)&&(h.debug("Waiting for download of LanguageModel to complete."),await this.downloadPromise),!0}return n!==T.AVAILABLE?(h.debug(`On-device inference unavailable because availability is "${n}".`),!1):t.isOnDeviceRequest(e)?!0:(h.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),i=await n.prompt(s,this.onDeviceParams.promptOptions);return t.toResponse(i)}async generateContentStream(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),i=n.promptStreaming(s,this.onDeviceParams.promptOptions);return t.toStreamResponse(i)}async countTokens(e){throw new d(c.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return h.debug("Empty prompt rejected for on-device inference."),!1;for(let n of e.contents){if(n.role==="function")return h.debug('"Function" role rejected for on-device inference.'),!1;for(let s of n.parts)if(s.inlineData&&t.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return h.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(){let e=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return e===T.DOWNLOADABLE&&this.download(),e}download(){this.isDownloading||(this.isDownloading=!0,this.downloadPromise=this.languageModelProvider?.create(this.onDeviceParams.createOptions).finally(()=>{this.isDownloading=!1}))}static async toLanguageModelMessage(e){let n=await Promise.all(e.parts.map(t.toLanguageModelMessageContent));return{role:t.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){let s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new d(c.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new d(c.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,i){let o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});i.enqueue(n.encode(`data: ${o}

`))}}))}}};z.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Pn(t,e,n){if(typeof e<"u"&&t)return new z(e.LanguageModel,t,n)}var ge=class{constructor(e,n,s,i,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;let r=i?.getImmediate({optional:!0}),a=s?.getImmediate({optional:!0});this.auth=a||null,this.appCheck=r||null,n instanceof k?this.location=n.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function Mn(t,{instanceIdentifier:e}){if(!e)throw new d(c.ERROR,"AIService instance identifier is undefined.");let n=kn(e),s=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new ge(s,n,i,o,Pn)}var me=class t{constructor(e,n){if(e.app?.options?.apiKey)if(e.app?.options?.projectId)if(e.app?.options?.appId){if(this._apiSettings={apiKey:e.app.options.apiKey,project:e.app.options.projectId,appId:e.app.options.appId,automaticDataCollectionEnabled:e.app.automaticDataCollectionEnabled,location:e.location,backend:e.backend},je(e.app)&&e.app.settings.appCheckToken){let s=e.app.settings.appCheckToken;this._apiSettings.getAppCheckToken=()=>Promise.resolve({token:s})}else e.appCheck&&(e.options?.useLimitedUseAppCheckTokens?this._apiSettings.getAppCheckToken=()=>e.appCheck.getLimitedUseToken():this._apiSettings.getAppCheckToken=()=>e.appCheck.getToken());e.auth&&(this._apiSettings.getAuthToken=()=>e.auth.getToken()),this.model=t.normalizeModelName(n,this._apiSettings.backend.backendType)}else throw new d(c.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.');else throw new d(c.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new d(c.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.')}static normalizeModelName(e,n){return n===w.GOOGLE_AI?t.normalizeGoogleAIModelName(e):t.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}};var F;(function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.PREDICT="predict"})(F||(F={}));var Y=class{constructor(e,n,s,i,o){this.model=e,this.task=n,this.apiSettings=s,this.stream=i,this.requestOptions=o}toString(){let e=new URL(this.baseUrl);return e.pathname=`/${this.apiVersion}/${this.modelPath}:${this.task}`,e.search=this.queryParams.toString(),e.toString()}get baseUrl(){return this.requestOptions?.baseUrl||`https://${In}`}get apiVersion(){return Tn}get modelPath(){if(this.apiSettings.backend instanceof A)return`projects/${this.apiSettings.project}/${this.model}`;if(this.apiSettings.backend instanceof k)return`projects/${this.apiSettings.project}/locations/${this.apiSettings.backend.location}/${this.model}`;throw new d(c.ERROR,`Invalid backend: ${JSON.stringify(this.apiSettings.backend)}`)}get queryParams(){let e=new URLSearchParams;return this.stream&&e.set("alt","sse"),e}};function xn(){let t=[];return t.push(`${vn}/${qe}`),t.push(`fire/${qe}`),t.join(" ")}async function Bn(t){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",xn()),e.append("x-goog-api-key",t.apiSettings.apiKey),t.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.apiSettings.appId),t.apiSettings.getAppCheckToken){let n=await t.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&h.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.apiSettings.getAuthToken){let n=await t.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Un(t,e,n,s,i,o){let r=new Y(t,e,n,s,o);return{url:r.toString(),fetchOptions:{method:"POST",headers:await Bn(r),body:i}}}async function _e(t,e,n,s,i,o){let r=new Y(t,e,n,s,o),a,l;try{let u=await Un(t,e,n,s,i,o),E=o?.timeout!=null&&o.timeout>=0?o.timeout:Dn,S=new AbortController;if(l=setTimeout(()=>S.abort(),E),u.fetchOptions.signal=S.signal,a=await fetch(u.url,u.fetchOptions),!a.ok){let C="",p;try{let g=await a.json();C=g.error.message,g.error.details&&(C+=` ${JSON.stringify(g.error.details)}`,p=g.error.details)}catch{}throw a.status===403&&p&&p.some(g=>g.reason==="SERVICE_DISABLED")&&p.some(g=>g.links?.[0]?.description.includes("Google developers console API activation"))?new d(c.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${r.apiSettings.project}/genai/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:a.status,statusText:a.statusText,errorDetails:p}):new d(c.FETCH_ERROR,`Error fetching from ${r}: [${a.status} ${a.statusText}] ${C}`,{status:a.status,statusText:a.statusText,errorDetails:p})}}catch(u){let E=u;throw u.code!==c.FETCH_ERROR&&u.code!==c.API_NOT_ENABLED&&u instanceof Error&&(E=new d(c.ERROR,`Error fetching from ${r.toString()}: ${u.message}`),E.stack=u.stack),E}finally{l&&clearTimeout(l)}return a}function j(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&h.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),ot(t.candidates[0]))throw new d(c.RESPONSE_ERROR,`Response error: ${D(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function J(t){return t.candidates&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),Fn(t)}function Fn(t){return t.text=()=>{if(j(t))return Ze(t,e=>!e.thought);if(t.promptFeedback)throw new d(c.RESPONSE_ERROR,`Text not available. ${D(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(j(t)){let e=Ze(t,n=>!!n.thought);return e===""?void 0:e}else if(t.promptFeedback)throw new d(c.RESPONSE_ERROR,`Thought summary not available. ${D(t)}`,{response:t})},t.inlineDataParts=()=>{if(j(t))return Hn(t);if(t.promptFeedback)throw new d(c.RESPONSE_ERROR,`Data not available. ${D(t)}`,{response:t})},t.functionCalls=()=>{if(j(t))return $n(t);if(t.promptFeedback)throw new d(c.RESPONSE_ERROR,`Function call not available. ${D(t)}`,{response:t})},t}function Ze(t,e){let n=[];if(t.candidates?.[0].content?.parts)for(let s of t.candidates?.[0].content?.parts)s.text&&e(s)&&n.push(s.text);return n.length>0?n.join(""):""}function $n(t){let e=[];if(t.candidates?.[0].content?.parts)for(let n of t.candidates?.[0].content?.parts)n.functionCall&&e.push(n.functionCall);if(e.length>0)return e}function Hn(t){let e=[];if(t.candidates?.[0].content?.parts)for(let n of t.candidates?.[0].content?.parts)n.inlineData&&e.push(n);if(e.length>0)return e}var Vn=[Qe.RECITATION,Qe.SAFETY];function ot(t){return!!t.finishReason&&Vn.some(e=>e===t.finishReason)}function D(t){let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",t.promptFeedback?.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),t.promptFeedback?.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if(t.candidates?.[0]){let n=t.candidates[0];ot(n)&&(e+=`Candidate was blocked due to ${n.finishReason}`,n.finishMessage&&(e+=`: ${n.finishMessage}`))}return e}function rt(t){if(t.safetySettings?.forEach(e=>{if(e.method)throw new d(c.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),t.generationConfig?.topK){let e=Math.round(t.generationConfig.topK);e!==t.generationConfig.topK&&(h.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=e)}return t}function we(t){return{candidates:t.candidates?jn(t.candidates):void 0,prompt:t.promptFeedback?Wn(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Gn(t,e){return{generateContentRequest:{model:e,...t}}}function jn(t){let e=[],n;return e&&t.forEach(s=>{let i;if(s.citationMetadata&&(i={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(r=>({...r,severity:r.severity??it.HARM_SEVERITY_UNSUPPORTED,probabilityScore:r.probabilityScore??0,severityScore:r.severityScore??0}))),s.content?.parts?.some(r=>r?.videoMetadata))throw new d(c.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:i,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function Wn(t){let e=[];return t.safetyRatings.forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??it.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}var et=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function zn(t,e){let n=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=Kn(n),[i,o]=s.tee();return{stream:Jn(i,e),response:Yn(o,e)}}async function Yn(t,e){let n=[],s=t.getReader();for(;;){let{done:i,value:o}=await s.read();if(i){let r=qn(n);return e.backend.backendType===w.GOOGLE_AI&&(r=we(r)),J(r)}n.push(o)}}async function*Jn(t,e){let n=t.getReader();for(;;){let{value:s,done:i}=await n.read();if(i)break;let o;e.backend.backendType===w.GOOGLE_AI?o=J(we(s)):o=J(s);let r=o.candidates?.[0];!r?.content?.parts&&!r?.finishReason&&!r?.citationMetadata&&!r?.urlContextMetadata||(yield o)}}function Kn(t){let e=t.getReader();return new ReadableStream({start(s){let i="";return o();function o(){return e.read().then(({value:r,done:a})=>{if(a){if(i.trim()){s.error(new d(c.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}i+=r;let l=i.match(et),u;for(;l;){try{u=JSON.parse(l[1])}catch{s.error(new d(c.PARSE_FAILED,`Error parsing JSON response: "${l[1]}`));return}s.enqueue(u),i=i.substring(l[0].length),l=i.match(et)}return o()})}}})}function qn(t){let n={promptFeedback:t[t.length-1]?.promptFeedback};for(let s of t)if(s.candidates)for(let i of s.candidates){let o=i.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:i.index}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,n.candidates[o].groundingMetadata=i.groundingMetadata;let r=i.urlContextMetadata;if(typeof r=="object"&&r!==null&&Object.keys(r).length>0&&(n.candidates[o].urlContextMetadata=r),i.content){if(!i.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});for(let a of i.content.parts){let l={...a};a.text!==""&&Object.keys(l).length>0&&n.candidates[o].content.parts.push(l)}}}return n}var Xn=[c.FETCH_ERROR,c.ERROR,c.API_NOT_ENABLED];async function at(t,e,n,s){if(!e)return s();switch(e.mode){case v.ONLY_ON_DEVICE:if(await e.isAvailable(t))return n();throw new d(c.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case v.ONLY_IN_CLOUD:return s();case v.PREFER_IN_CLOUD:try{return await s()}catch(i){if(i instanceof d&&Xn.includes(i.code))return n();throw i}case v.PREFER_ON_DEVICE:return await e.isAvailable(t)?n():s();default:throw new d(c.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function Qn(t,e,n,s){return t.backend.backendType===w.GOOGLE_AI&&(n=rt(n)),_e(e,F.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s)}async function ct(t,e,n,s,i){let o=await at(n,s,()=>s.generateContentStream(n),()=>Qn(t,e,n,i));return zn(o,t)}async function Zn(t,e,n,s){return t.backend.backendType===w.GOOGLE_AI&&(n=rt(n)),_e(e,F.GENERATE_CONTENT,t,!1,JSON.stringify(n),s)}async function lt(t,e,n,s,i){let o=await at(n,s,()=>s.generateContent(n),()=>Zn(t,e,n,i)),r=await es(o,t);return{response:J(r)}}async function es(t,e){let n=await t.json();return e.backend.backendType===w.GOOGLE_AI?we(n):n}function dt(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function Ee(t){let e=[];if(typeof t=="string")e=[{text:t}];else for(let n of t)typeof n=="string"?e.push({text:n}):e.push(n);return ts(e)}function ts(t){let e={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,i=!1;for(let o of t)"functionResponse"in o?(n.parts.push(o),i=!0):(e.parts.push(o),s=!0);if(s&&i)throw new d(c.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!s&&!i)throw new d(c.INVALID_CONTENT,"No Content is provided for sending chat message.");return s?e:n}function he(t){let e;return t.contents?e=t:e={contents:[Ee(t)]},t.systemInstruction&&(e.systemInstruction=dt(t.systemInstruction)),e}var tt=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ns={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},nt={user:["model"],function:["model"],model:["user","function"],system:[]};function ss(t){let e=null;for(let n of t){let{role:s,parts:i}=n;if(!e&&s!=="user")throw new d(c.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!Xe.includes(s))throw new d(c.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(Xe)}`);if(!Array.isArray(i))throw new d(c.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(i.length===0)throw new d(c.INVALID_CONTENT,"Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(let a of i)for(let l of tt)l in a&&(o[l]+=1);let r=ns[s];for(let a of tt)if(!r.includes(a)&&o[a]>0)throw new d(c.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!nt[s].includes(e.role))throw new d(c.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(nt)}`);e=n}}var st="SILENT_ERROR",be=class{constructor(e,n,s,i,o){this.model=n,this.chromeAdapter=s,this.params=i,this.requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e,i?.history&&(ss(i.history),this._history=i.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){await this._sendPromise;let n=Ee(e),s={safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,n]},i={};return this._sendPromise=this._sendPromise.then(()=>lt(this._apiSettings,this.model,s,this.chromeAdapter,this.requestOptions)).then(o=>{if(o.response.candidates&&o.response.candidates.length>0){this._history.push(n);let r={parts:o.response.candidates?.[0].content.parts||[],role:o.response.candidates?.[0].content.role||"model"};this._history.push(r)}else{let r=D(o.response);r&&h.warn(`sendMessage() was unsuccessful. ${r}. Inspect response object for details.`)}i=o}),await this._sendPromise,i}async sendMessageStream(e){await this._sendPromise;let n=Ee(e),s={safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,n]},i=ct(this._apiSettings,this.model,s,this.chromeAdapter,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>i).catch(o=>{throw new Error(st)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history.push(n);let r={...o.candidates[0].content};r.role||(r.role="model"),this._history.push(r)}else{let r=D(o);r&&h.warn(`sendMessageStream() was unsuccessful. ${r}. Inspect response object for details.`)}}).catch(o=>{o.message!==st&&h.error(o)}),i}};async function is(t,e,n,s){let i="";if(t.backend.backendType===w.GOOGLE_AI){let r=Gn(n,e);i=JSON.stringify(r)}else i=JSON.stringify(n);return(await _e(e,F.COUNT_TOKENS,t,!1,i,s)).json()}async function os(t,e,n,s,i){if(s?.mode===v.ONLY_ON_DEVICE)throw new d(c.UNSUPPORTED,"countTokens() is not supported for on-device models.");return is(t,e,n,i)}var ye=class extends me{constructor(e,n,s,i){super(e,n.model),this.chromeAdapter=i,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=dt(n.systemInstruction),this.requestOptions=s||{}}async generateContent(e){let n=he(e);return lt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,this.requestOptions)}async generateContentStream(e){let n=he(e);return ct(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,this.requestOptions)}startChat(e){return new be(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e){let n=he(e);return os(this._apiSettings,this.model,n,this.chromeAdapter)}};var rs="audio-processor",Us=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${rs}', AudioProcessor);
`;function ut(t=G(),e){t=De(t);let n=Ge(t,L),s=e?.backend??new A,i={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},o=Ln(s),r=n.getImmediate({identifier:o});return r.options=i,r}function ft(t,e,n){let s=e,i;if(s.mode?i=s.inCloudParams||{model:Nn}:i=e,!i.model)throw new d(c.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let o=t.chromeAdapterFactory?.(s.mode,typeof window>"u"?void 0:window,s.onDeviceParams);return new ye(t,i,n,o)}function as(){B(new y(L,Mn,"PUBLIC").setMultipleInstances(!0)),R(Je,pe),R(Je,pe,"esm2020")}as();var ht={apiKey:"AIzaSyAI621_RE0z-5pEZsmMQeaB_GKqojdkxKw",authDomain:"prompt-genie-9a51d.firebaseapp.com",projectId:"prompt-genie-9a51d",appId:"1:220323401073:web:d2e8e33fc5c7803ed03ad0"};var Se;We().length===0?Se=fe(ht):Se=G();var cs=ut(Se,{backend:new A}),ls=ft(cs,{model:"gemini-2.5-flash"});})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
