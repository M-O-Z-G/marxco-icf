parcelRequire=function(e,t,o,n){function r(o,n){function c(e){return r(c.resolve(e))}function i(t){return e[o][1][t]||t}if(!t[o]){if(!e[o]){var s="function"==typeof parcelRequire&&parcelRequire
if(!n&&s)return s(o,!0)
if(l)return l(o,!0)
if(a&&"string"==typeof o)return a(o)
var d=new Error("Cannot find module '"+o+"'")
throw d.code="MODULE_NOT_FOUND",d}c.resolve=i,c.cache={}
var u=t[o]=new r.Module(o)
e[o][0].call(u.exports,c,u,u.exports,this)}return t[o].exports}function c(e){this.id=e,this.bundle=r,this.exports={}}var l="function"==typeof parcelRequire&&parcelRequire,a="function"==typeof require&&require
r.isParcelRequire=!0,r.Module=c,r.modules=e,r.cache=t,r.parent=l,r.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]}
for(var i,s=0;s<o.length;s++)try{r(o[s])}catch(d){i||(i=d)}if(o.length){var u=r(o[o.length-1])
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):n&&(this[n]=u)}if(parcelRequire=r,i)throw i
return r}({bbWE:[function(e,t,o){var n=arguments[3]
Object.defineProperty(o,"__esModule",{value:!0}),o.modal=o.dropdown=o.navbar=void 0
var r=function(e){return Array.prototype.slice.call(document.querySelectorAll(e),0)},c=function(e,t){e.forEach(function(e){e.classList.remove(t)})}
n.$bspSelectors={navbarBurger:".navbar-burger",dropdown:".dropdown",modal:".modal",modalButton:".modal-button",modalBackground:".modal-background",modalClose:".modal-close",modalCardHead:".modal-card-head","delete":".delete",modalCardFoot:".modal-card-foot",button:".button",isClipped:"is-clipped",isHoverable:".is-hoverable",isActive:"is-active"},o.navbar=function(){var e=Array.prototype.slice.call(document.querySelectorAll($bspSelectors.navbarBurger),0)
e.length>0&&e.forEach(function(e){e.addEventListener("click",function(){console.log("Clicked!")
var t=e.dataset.target,o=document.getElementById(t)
e.classList.toggle($bspSelectors.isActive),o.classList.toggle($bspSelectors.isActive)})})},o.dropdown=function(){var e=r($bspSelectors.dropdown+":not("+$bspSelectors.isHoverable+")")
e.length>0&&(e.forEach(function(e){e.addEventListener("click",function(t){t.stopPropagation(),e.classList.toggle($bspSelectors.isActive)})}),document.addEventListener("click",function(t){e.forEach(function(e){e.classList.remove($bspSelectors.isActive)})}))},o.modal=function(){function e(e){var t=document.getElementById(e)
o.classList.add($bspSelectors.isClipped),t.classList.add($bspSelectors.isActive)}function t(){n.forEach(function(e){e.classList.add("is-closing")}),setTimeout(function(){o.classList.remove($bspSelectors.isClipped),n.forEach(function(e){e.classList.remove($bspSelectors.isActive),e.classList.remove("is-closing")})},500)}var o=document.documentElement,n=r($bspSelectors.modal),l=r($bspSelectors.modalButton),a=r($bspSelectors.modalBackground+", "+$bspSelectors.modalClose+", "+$bspSelectors.modalCardHead+" "+$bspSelectors["delete"]+", "+$bspSelectors.modalCardFoot+" "+$bspSelectors.button)
l.length>0&&l.forEach(function(t){t.addEventListener("click",function(){var o=t.dataset.target
t.dataset.slug
e(o)})}),a.length>0&&a.forEach(function(e){e.addEventListener("click",function(){t()})}),document.addEventListener("keydown",function(e){var o=e||window.event
27===o.keyCode&&(t(),c(r($bspSelectors.dropdown+":not("+$bspSelectors.isHoverable+")"),$bspSelectors.isActive))})}},{}],ZCfc:[function(e,t,o){var n=arguments[3],r=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),c=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e["default"]=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var o in e)Object.hasOwnProperty.call(e,o)&&r(t,e,o)
return c(t,e),t}
Object.defineProperty(o,"__esModule",{value:!0})
var a=l(e("./scripts/bulma.ts"))
n.appendData=function(e,t,o,n){console.log("Target is: "+n)
var r=document.querySelector("#"+n),c=r.querySelector("#icDataURI"),l=r.querySelector("#icSVG")
c.value=o,l.value=t,r.querySelector("#icSave").setAttribute("href",o),r.querySelector("#icSave").setAttribute("download",e+".svg"),r.querySelector("figure").innerHTML=t,r.querySelector("#icName").innerHTML=e,c.addEventListener("click",function(){this.select()}),l.addEventListener("click",function(){this.select()}),r.querySelector("#icCopy").addEventListener("click",function(){c.select(),document.execCommand("copy")})}
var i=function(e){return Array.prototype.slice.call(document.querySelectorAll(e),0)}
n.$bspSelectors={navbarBurger:".navbar-burger",dropdown:".dropdown",modal:".modal",modalButton:".modal-button",modalBackground:".modal-background",modalClose:".modal-close",modalCardHead:".modal-card-head","delete":".delete",modalCardFoot:".modal-card-foot",button:".button",isClipped:"is-clipped",isHoverable:".is-hoverable",isActive:"is-active"},document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("icsb"),t=(i(".icon-wall .columns .column"),document.querySelectorAll(".icon-wall .columns .column")),o=i('.search-boxes input.input[type="search"]')
if("undefined"!=typeof e&&null!=e){var n=e.dataset.string
document.querySelectorAll('.column[id^="ic-"][id*="'+n+'"]')}var r=function(e){$newValue=e.value,o.forEach(function(e){e.value=$newValue}),$allIcons=i(".icon-wall .column"),$matchedIcons=i(".icon-wall .column[data-slug*='"+$newValue+"']"),$allIcons.forEach(function(e){if(e.dataset.slug.search($newValue)>=0)e.style.removeProperty?e.style.removeProperty("display"):e.style.removeAttribute("display")
else if("none"!==window.getComputedStyle(e).display)return void(e.style.display="none")})}
"undefined"!=typeof e&&null!=e&&(console.log("Inputs found: "+o.length),o.forEach(function(e){e.addEventListener("input",function(){return r(e)})})),a.navbar(),a.dropdown(),fetch("data.json").then(function(e){return e.json()}).then(function(e){var o=e
a.modal()
var n=document.documentElement,r=i($bspSelectors.modal),c=i("#icon-preview #closeModal")
c.length>0&&c.forEach(function(e){e.addEventListener("click",function(){r.forEach(function(e){e.classList.add("is-closing")}),window.setTimeout(function(){n.classList.remove($bspSelectors.isClipped),r.forEach(function(e){e.classList.remove($bspSelectors.isActive),e.classList.remove("is-closing")})},500)})}),t.length>0&&t.forEach(function(e){e.addEventListener("click",function(){var t=e.dataset.target,n=e.dataset.slug,r=atob(o[n].dataURI.replace(/^.*,/,"")),c=o[n].dataURI
console.log(o),appendData(n,r,c,t)})})})["catch"](function(e){return console.log(e)})})},{"./scripts/bulma.ts":"bbWE"}]},{},["ZCfc"],null)
