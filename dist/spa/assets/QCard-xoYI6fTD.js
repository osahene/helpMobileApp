import{p as o,c as t,h as n,P as s,g as c}from"./index-DVs4Rc6n.js";const f=o({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(a,{slots:e}){const r=t(()=>`q-card__section q-card__section--${a.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>n(a.tag,{class:r.value},s(e.default))}}),l={dark:{type:Boolean,default:null}};function i(a,e){return t(()=>a.dark===null?e.dark.isActive:a.dark)}const k=o({name:"QCard",props:{...l,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(a,{slots:e}){const{proxy:{$q:r}}=c(),d=i(a,r),u=t(()=>"q-card"+(d.value===!0?" q-card--dark q-dark":"")+(a.bordered===!0?" q-card--bordered":"")+(a.square===!0?" q-card--square no-border-radius":"")+(a.flat===!0?" q-card--flat no-shadow":""));return()=>n(a.tag,{class:u.value},s(e.default))}});export{f as Q,k as a,l as b,i as u};
