// ==UserScript==
// @name         ebird-checklist
// @namespace    https://kennychou.github.io/
// @version      1.0.2
// @description  使用Vue2.x構建Tampermonkey for ebird checklist
// @author       Kenny Chou
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.setClipboard
// @grant        GM_info
// @grant        GM.xmlHttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js
// @match        https://ebird.org/mychecklists*
// @match        https://ebird.org/taiwan/mychecklists*
// ==/UserScript==

!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=XLSX},function(e,t){e.exports=Vue},function(e,t){e.exports=axios},function(e,t,n){"use strict";(function(e){function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!e.vueAxiosInstalled){var n=a(t)?function(e){return{axios:e,$http:e}}(t):t;if(function(e){return"object"===o(e)&&Object.keys(e).every((function(t){return a(e[t])}))}(n)){var i=function(e){return e&&e.version&&Number(e.version.split(".")[0])}(e);if(i){var c=i<3?s:r;Object.keys(n).forEach((function(t){c(e,t,n[t])})),e.vueAxiosInstalled=!0}else console.error("[vue-axios] unknown Vue version")}else console.error("[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }")}}function s(e,t,n){Object.defineProperty(e.prototype,t,{get:function(){return n}}),e[t]=n}function r(e,t,n){e.config.globalProperties[t]=n,e[t]=n}function a(e){return e&&"function"==typeof e.get&&"function"==typeof e.post}n.d(t,"a",(function(){return i})),"object"==("undefined"==typeof exports?"undefined":o(exports))?e.exports=i:"function"==typeof define&&n(5)?define([],(function(){return i})):window.Vue&&window.axios&&window.Vue.use&&Vue.use(i,window.axios)}).call(this,n(4)(e))},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t,n){"use strict";n.r(t);var o=n(1),i=n.n(o),s=n(2),r=n.n(s),a=n(3),c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"Page-section-inner Page-section-inner--md"},[""==e.ebirdKey?t("div",[t("label",[e._m(0),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.inputkey,expression:"inputkey"}],attrs:{type:"text"},domProps:{value:e.inputkey},on:{input:function(t){t.target.composing||(e.inputkey=t.target.value)}}})]),e._v(" "),t("button",{staticClass:"Button Button--highlight",on:{click:e.saveKey}},[e._v("儲存")])]):e._e(),e._v(" "),0==Object.keys(e.sp_info).length?t("div",[t("label",[t("span",[e._v("鳥名顯示方式")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.lang,expression:"lang"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.lang=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"zh_TW"}},[e._v("中文俗名")]),e._v(" "),t("option",{attrs:{value:"en"}},[e._v("英文俗名")])]),e._v(" "),t("button",{staticClass:"Button Button--highlight",on:{click:e.loadSp}},[e._v("\n        下載鳥名錄\n      ")])])]):e._e(),e._v(" "),e.checklist.length>0?t("div",[t("button",{staticClass:"Button Button--highlight",on:{click:e.download}},[e._v("\n      下載選取清單 "+e._s(e.checklist.size)+"\n    ")])]):e._e(),e._v(" "),e.info?t("div",[t("p",{domProps:{innerHTML:e._s(e.message)}})]):e._e()])};c._withStripped=!0;var l=n(0);const u={NY:"NY Nest with Young",NE:"NE NNest with Eggs",FS:"CS Carrying Fecal Sac",FR:"FY Feeding Young",CF:"CF Carrying Food",FL:"FL Recently Fledged Young",ON:"ON Occupied Nest",UN:"UN Used Nest",DD:"DD Distraction Display",NB:"NB Nest Building",CM:"CN Carrying Nesting Material",BP:"PE Physiological Evidence",DN:"B Wren/Woodpecker Nest Building",AB:"A Agitated Behavior",VS:"N Visiting Probable Nest Site",CC:"C Courtship, Display or Copulation",T7:"T Territorial Defense",PO:"P Pair in Suitable Habitat",SM:"M Multiple (7+) Singing Birds",S7:"S7 Singing Bird Present 7+ Days",S1:"S Singing Bird",OS:"H In Appropriate Habitat",FO:"F Flyover"};var d=function(e,t,n,o,i,s,r,a){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),o&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},l._ssrRegister=c):i&&(c=a?function(){i.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(e,t){return c.call(t),u(e,t)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:l}}({name:"app",data:()=>({AppName:"ebird-checklist",AppVersion:"1.0.2",sp_info:{},checklist:[],breeding_code:u,inputkey:"",ebirdKey:"",lang:"zh_TW",pro_code:{P20:"eBird - Casual Observation",P21:"eBird - Stationary Count",P22:"eBird - Traveling Count",P23:"eBird - Exhaustive Area Count"},info:!1,message:""}),mounted(){this.genDownloadButton()},created(){this.ebirdKey=localStorage.getItem("ebirdKey")||"",this.sp_info=JSON.parse(localStorage.getItem("sp_info")||"{}")},methods:{genDownloadButton(){const e=document.getElementsByClassName("kenny-checkbox");for(;e.length>0;)e[0].remove();if(0!=Object.keys(this.sp_info).length&&""!=this.ebirdKey){try{const e=document.getElementById("place-species-observed-results").getElementsByClassName("ResultsStats ResultsStats--manageMyChecklists");for(const t of e){const e=t.id.split("-")[1],n=document.createElement("input");n.type="checkbox",n.value=e,n.className="kenny-checkbox",n.addEventListener("change",e=>this.selected(e)),t.getElementsByClassName("Color-text-neutral-4 u-text-3")[0].prepend(n)}}catch(e){this.info=!0,this.message=e}this.info=!1}},selected(e){this.$set(this,"checklist",[...document.querySelectorAll(".kenny-checkbox:checked")].map(e=>e.value))},array2object:e=>e.reduce((e,t)=>{const n=Object.keys(t)[0];return e[n]=t[n],e}),async loadSp(){this.info=!0,this.message="正在下載鳥名錄中...";const e=await this.$http.get("https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale="+this.lang);this.sp_info=this.array2object(e.data.map(e=>{var t={};return t[e.speciesCode]={c:e.comName,s:e.sciName,o:e.taxonOrder},t})),localStorage.setItem("sp_info",JSON.stringify(this.sp_info)),this.message="儲存成功",this.genDownloadButton()},saveKey(){localStorage.setItem("ebirdKey",this.inputkey),this.ebirdKey=this.inputkey,this.genDownloadButton(),this.info=!1},async getLoc(e){try{return(await this.$http.get("https://api.ebird.org/v2/ref/hotspot/info/"+e,{headers:{"X-eBirdApiToken":this.ebirdKey}})).data}catch(e){return}},async download(e){this.info=!0,this.message="";var t=[];for(const e of this.checklist)try{this.message=this.message+`下載Checklist [${e}]...<br />`;const n=(await this.$http.get("https://api.ebird.org/v2/product/checklist/view/"+e,{headers:{"X-eBirdApiToken":this.ebirdKey}})).data,o=await this.getLoc(n.locId);for(const e of n.obs){const i=this.sp_info[e.speciesCode];t.push({"Submission ID":n.subId,"Common Name":i.c,"Scientific Name":i.s,"Taxonomic Order":i.o,Count:e.howManyAtmost,"State/Province":n.subnational1Code,County:n.contryName,"Location ID":n.locId,Location:o?o.name:"",Latitude:o?o.latitude:"",Longitude:o?o.longitude:"",Date:n.obsDt.split(" ")[0],Time:n.obsDt.split(" ")[1],Protocol:this.pro_code[n.protocolId],"Duration (Min)":n.durationHrs?parseInt(60*parseFloat(n.durationHrs)):"","All Obs Reported":n.allObsReported?1:0,"Distance Traveled (km)":n.effortDistanceKm?n.effortDistanceKm:"","Area Covered (ha)":n.effortAreaHa?n.effortAreaHa:"","Number of Observers":n.numObservers,"Breeding Code":e.obsAus?this.breeding_codes[e.obsAux[0].auxCode]:"","Observation Details":e.comments?e.comments:"","Checklist Comments":n.comments?n.comments:""})}}catch(e){return this.message=`ebirdKey 有問題 [${e}]<br />`,this.ebirdKey="",localStorage.removeItem("ebirdKey"),this.checklist.clear(),void this.genDownloadButton()}this.message=this.message+"產生Excel...<br/>";const n=l.utils.json_to_sheet(t),o=l.utils.book_new();l.utils.book_append_sheet(o,n,"sheet1");const i=`checklist_${(new Date).valueOf()}.xlsx`;this.message=this.message+"開始下載<br/>",l.writeFile(o,i),this.info=!1}}},c,[function(){var e=this._self._c;return e("span",[this._v("輸入"),e("a",{attrs:{href:"https://ebird.org/api/keygen",target:"_block"}},[this._v("eBird API")])])}],!1,null,null,null).exports;const p="app_vue_"+Date.now(),f=document.createElement("div");f.id=p;{const e=document.getElementById("myChecklistsForm");console.log(e),e.after(f)}i.a.use(a.a,r.a),new i.a({el:"#"+p,render:e=>e(d)})}]);