import{p as q,i as X,q as P,O as M,c as d,h as g,P as j,x as B,S as A,g as E,U as W,V as K,w as L,o as N,u as Y,W as D,X as I,r as w,t as _,B as z,a as k,v as G}from"./index-DVs4Rc6n.js";import{Q as O}from"./_plugin-vue_export-helper-Dq8LnRnP.js";const ae=q({name:"QPageContainer",setup(e,{slots:i}){const{proxy:{$q:o}}=E(),t=X(B,P);if(t===P)return console.error("QPageContainer needs to be child of QLayout"),P;M(A,!0);const r=d(()=>{const a={};return t.header.space===!0&&(a.paddingTop=`${t.header.size}px`),t.right.space===!0&&(a[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(a.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(a[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),a});return()=>g("div",{class:"q-page-container",style:r.value},j(i.default))}}),J=[Element,String],Z=[null,document,document.body,document.scrollingElement,document.documentElement];function ee(e,i){let o=K(i);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return Z.includes(o)?window:o}function te(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function oe(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let T;function $(){if(T!==void 0)return T;const e=document.createElement("p"),i=document.createElement("div");W(e,{width:"100%",height:"200px"}),W(i,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),i.appendChild(e),document.body.appendChild(i);const o=e.offsetWidth;i.style.overflow="scroll";let t=e.offsetWidth;return o===t&&(t=i.clientWidth),i.remove(),T=o-t,T}const{passive:F}=I,ne=["both","horizontal","vertical"],ie=q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>ne.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:J},emits:["scroll"],setup(e,{emit:i}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,r,a;L(()=>e.scrollTarget,()=>{v(),y()});function f(){t!==null&&t();const m=Math.max(0,te(r)),p=oe(r),c={top:m-o.position.top,left:p-o.position.left};if(e.axis==="vertical"&&c.top===0||e.axis==="horizontal"&&c.left===0)return;const S=Math.abs(c.top)>=Math.abs(c.left)?c.top<0?"up":"down":c.left<0?"left":"right";o.position={top:m,left:p},o.directionChanged=o.direction!==S,o.delta=c,o.directionChanged===!0&&(o.direction=S,o.inflectionPoint=o.position),i("scroll",{...o})}function y(){r=ee(a,e.scrollTarget),r.addEventListener("scroll",l,F),l(!0)}function v(){r!==void 0&&(r.removeEventListener("scroll",l,F),r=void 0)}function l(m){if(m===!0||e.debounce===0||e.debounce==="0")f();else if(t===null){const[p,c]=e.debounce?[setTimeout(f,e.debounce),clearTimeout]:[requestAnimationFrame(f),cancelAnimationFrame];t=()=>{c(p),t=null}}}const{proxy:b}=E();return L(()=>b.$q.lang.rtl,f),N(()=>{a=b.$el.parentNode,y()}),Y(()=>{t!==null&&t(),v()}),Object.assign(b,{trigger:l,getPosition:()=>o}),D}}),se=q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:i,emit:o}){const{proxy:{$q:t}}=E(),r=w(null),a=w(t.screen.height),f=w(e.container===!0?0:t.screen.width),y=w({position:0,direction:"down",inflectionPoint:0}),v=w(0),l=w(_.value===!0?0:$()),b=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),m=d(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),p=d(()=>l.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${l.value}px`}:null),c=d(()=>l.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${l.value}px`,width:`calc(100% + ${l.value}px)`}:null);function S(n){if(e.container===!0||document.qScrollPrevented!==!0){const s={position:n.position.top,direction:n.direction,directionChanged:n.directionChanged,inflectionPoint:n.inflectionPoint.top,delta:n.delta.top};y.value=s,e.onScroll!==void 0&&o("scroll",s)}}function U(n){const{height:s,width:h}=n;let u=!1;a.value!==s&&(u=!0,a.value=s,e.onScrollHeight!==void 0&&o("scrollHeight",s),R()),f.value!==h&&(u=!0,f.value=h),u===!0&&e.onResize!==void 0&&o("resize",n)}function V({height:n}){v.value!==n&&(v.value=n,R())}function R(){if(e.container===!0){const n=a.value>v.value?$():0;l.value!==n&&(l.value=n)}}let x=null;const Q={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:r,height:a,containerHeight:v,scrollbarWidth:l,totalWidth:d(()=>f.value+l.value),rows:d(()=>{const n=e.view.toLowerCase().split(" ");return{top:n[0].split(""),middle:n[1].split(""),bottom:n[2].split("")}}),header:z({size:0,offset:0,space:!1}),right:z({size:300,offset:0,space:!1}),footer:z({size:0,offset:0,space:!1}),left:z({size:300,offset:0,space:!1}),scroll:y,animate(){x!==null?clearTimeout(x):document.body.classList.add("q-body--layout-animate"),x=setTimeout(()=>{x=null,document.body.classList.remove("q-body--layout-animate")},155)},update(n,s,h){Q[n][s]=h}};if(M(B,Q),$()>0){let n=function(){u=null,C.classList.remove("hide-scrollbar")},s=function(){if(u===null){if(C.scrollHeight>t.screen.height)return;C.classList.add("hide-scrollbar")}else clearTimeout(u);u=setTimeout(n,300)},h=function(H){u!==null&&H==="remove"&&(clearTimeout(u),n()),window[`${H}EventListener`]("resize",s)},u=null;const C=document.body;L(()=>e.container!==!0?"add":"remove",h),e.container!==!0&&h("add"),k(()=>{h("remove")})}return()=>{const n=G(i.default,[g(ie,{onScroll:S}),g(O,{onResize:U})]),s=g("div",{class:b.value,style:m.value,ref:e.container===!0?void 0:r,tabindex:-1},n);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:r},[g(O,{onResize:V}),g("div",{class:"absolute-full",style:p.value},[g("div",{class:"scroll",style:c.value},[s])])]):s}}});export{se as Q,ae as a};