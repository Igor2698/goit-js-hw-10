import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as p,i as D}from"./assets/vendor-651d7991.js";const n=document.querySelector("button[data-start]"),c=document.querySelector(".value[data-days]"),s=document.querySelector(".value[data-hours]"),u=document.querySelector(".value[data-minutes]"),d=document.querySelector(".value[data-seconds]");let a,l=0;const C={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){a=t[0],S()},onReady(){n.disabled=!0}};p("#datetime-picker",C);function S(t){a-new Date<=0?(M("Change your choice","Please choose a date in the future"),n.disabled=!0):n.disabled=!1}n.addEventListener("click",v);function v(){n.disabled=!0,l=setInterval(x,1e3)}function x(){const t=a-new Date;if(t<0){b();return}const e=q(t);I(e)}function b(){c.textContent="00",s.textContent="00",u.textContent="00",d.textContent="00",clearInterval(l)}function q(t){const f=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),y=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:f,hours:m,minutes:y,seconds:h}}function o(t){return t.toString().padStart(2,"0")}function I({days:t,hours:e,minutes:r,seconds:i}){c.textContent=o(t),s.textContent=o(e),u.textContent=o(r),d.textContent=o(i)}const M=(t,e)=>{D.info({title:t,message:e,position:"topCenter",timeout:2e3})};
//# sourceMappingURL=commonHelpers.js.map