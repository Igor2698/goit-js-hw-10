import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as l,i as m}from"./assets/vendor-651d7991.js";const f=document.querySelector("#datetime-picker"),n=document.querySelector("button[data-start]"),y=document.querySelector(".value[data-days]"),h=document.querySelector(".value[data-hours]"),p=document.querySelector(".value[data-minutes]"),D=document.querySelector(".value[data-seconds]");let a;n.disabled=!0;const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){a=e[0],b()}};l("#datetime-picker",S);function b(e){a-new Date<=0?(k("Change your choice","Please choose a date in the future"),n.disabled=!0):n.disabled=!1}n.addEventListener("click",v);function v(){n.disabled=!0,f.disabled=!0,intervalId=setInterval(C,1e3)}function C(){const e=a-new Date;if(e<0)return;const t=q(e);M(t)}function q(e){const i=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),d=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:u,seconds:d}}function o(e){return e.toString().padStart(2,"0")}function M({days:e,hours:t,minutes:r,seconds:s}){y.textContent=o(e),h.textContent=o(t),p.textContent=o(r),D.textContent=o(s)}const k=(e,t)=>{m.error({title:e,message:t,position:"topCenter",timeout:2e3})};
//# sourceMappingURL=commonHelpers.js.map
