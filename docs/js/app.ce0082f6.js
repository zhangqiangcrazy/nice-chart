(function(t){function e(e){for(var i,o,s=e[0],l=e[1],h=e[2],d=0,p=[];d<s.length;d++)o=s[d],r[o]&&p.push(r[o][0]),r[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return n.push.apply(n,h||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],i=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(i=!1)}i&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},r={app:0},n=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/vue-svg-charts/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var h=0;h<s.length;h++)e(s[h]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var i=a("64a9"),r=a.n(i);r.a},"204a":function(t,e,a){"use strict";var i=a("c6fa"),r=a.n(i);r.a},"56d7":function(t,e,a){"use strict";a.r(e);var i=a("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("img",{staticStyle:{"margin-bottom":"4rem"},attrs:{alt:"Vue logo",src:a("cf05")},on:{click:t.changeData}}),i("h3",[t._v("Simple")]),i("bar-graph",{attrs:{points:t.dataPoints}}),i("hr"),i("h3",[t._v("Advanced")]),i("bar-graph",{attrs:{title:"Test Bar Graph",animDuration:"1s",showValues:!0,animated:!0,points:t.dataPoints,labels:t.dataLabels,width:1024,height:320}}),i("hr"),i("h3",[t._v("Custom CSS (+slot for gradient)")]),i("bar-graph",{staticClass:"custom-style",attrs:{points:t.dataPoints}},[i("template",{slot:"svg-footer"},[i("linearGradient",{attrs:{id:"custom-style-gradient-vertical",x2:"0",y2:"1"}},[i("stop",{attrs:{offset:"0%","stop-color":"var(--color-stop-1)"}}),i("stop",{attrs:{offset:"50%","stop-color":"var(--color-stop-2)"}}),i("stop",{attrs:{offset:"100%","stop-color":"var(--color-stop-3)"}})],1)],1)],2)],1)},n=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("svg",{staticClass:"chart",attrs:{width:t.width,height:t.height}},[t.title?a("title",{attrs:{id:"title"}},[t._v(t._s(t.title))]):t._e(),t._l(t.chartData,function(e){return a("g",{key:e.index,attrs:{transform:"translate("+e.x+","+t.graphHeight+")"}},[a("title",[t._v(t._s(e.value))]),a("rect",{attrs:{width:t.partitionWidth-2,height:e.oldHeight,x:2,y:-e.oldHeight}},[t.animated?a("animate",{attrs:{attributeName:"height",from:e.oldHeight,to:e.height,dur:t.animDuration,begin:e.animBegin,fill:"freeze"}}):t._e(),t.animated?a("animate",{attrs:{attributeName:"y",from:-e.oldHeight,to:-e.height,dur:t.animDuration,begin:e.animBegin,fill:"freeze"}}):t._e()]),t.showValues?a("text",{attrs:{x:e.midPoint,y:-e.textOldHeight,dy:"20px","text-anchor":"middle"}},[t._v("\n        "+t._s(e.value)+"\n        "),t.animated?a("animate",{attrs:{attributeName:"y",from:-e.textOldHeight,to:-e.textHeight,dur:t.animDuration,begin:e.animBegin,fill:"freeze"}}):t._e()]):t._e(),t.labels[e.index]?a("text",{attrs:{x:e.midPoint,y:0,dy:"20px","text-anchor":"middle"}},[t._v(t._s(t.labels[e.index]))]):t._e()])}),t._t("svg-footer")],2)])},s=[],l={props:{title:{type:String,default:""},points:{type:Array,default:()=>[]},labels:{type:Array,default:()=>[]},height:{type:Number,default:320},width:{type:Number,default:680},animated:{type:Boolean,default:!0},showValues:{type:Boolean,default:!1},animDuration:{type:String,default:"1s"}},data(){return{start:Date.now(),lastUpdate:0,oldHeights:[]}},watch:{points(t,e){this.lastUpdate=Date.now();var a=Math.max(...e);this.oldHeights=e.map(t=>{return this.yWithMax(t,a)})}},computed:{graphHeight(){return this.labels.length>0?this.height-20:this.height},partitionWidth(){return this.width/this.points.length},maxDomain(){return Math.max(...this.points)},chartData(){return this.points.map((t,e)=>{let a={index:e,value:t,midPoint:this.partitionWidth/2,x:e*this.partitionWidth,height:this.y(t),oldHeight:"undefined"===typeof this.oldHeights[e]?0:this.oldHeights[e],animBegin:0==this.lastUpdate?"0":(this.lastUpdate-this.start)/1e3+"s"};return a.textHeight=Math.max(24,a.height),a.textOldHeight=Math.max(24,a.oldHeight),a})}},methods:{y(t){return this.yWithMax(t,this.maxDomain)},yWithMax(t,e){return t/e*this.graphHeight}}},h=l,u=(a("204a"),a("2877")),d=Object(u["a"])(h,o,s,!1,null,null,null),p=d.exports,c={name:"app",components:{BarGraph:p},data(){return{dataPoints:[42,8,15,16,23,42,4,8,15],dataLabels:["Label 1","Label 2","Label 3","Label 4","Label 5","Label 6","Label 7","Label 8","Label 9"]}},created:function(){window.setInterval(this.changeData,5e3)},methods:{changeData(){this.dataPoints=this.dataPoints.map(()=>{return Math.floor(Math.random()*Math.max(180))+1})}}},f=c,g=(a("034f"),Object(u["a"])(f,r,n,!1,null,null,null)),m=g.exports;i["a"].config.productionTip=!1,new i["a"]({render:t=>t(m)}).$mount("#app")},"64a9":function(t,e,a){},c6fa:function(t,e,a){},cf05:function(t,e,a){t.exports=a.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.ce0082f6.js.map