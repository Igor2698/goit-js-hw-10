import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as l}from"./assets/vendor-651d7991.js";const s=document.querySelector(".form");s.addEventListener("submit",a);function a(n){n.preventDefault();const i=document.querySelector('input[name="state"]:checked'),t=s.elements.delay.value,c=i.value,o=`promise in ${t}ms`;setTimeout(c==="fulfilled"?()=>Promise.resolve(`✅ Fulfilled ${o}`).then(e=>l.success({title:"Resolved",message:e,position:"topCenter",timeout:2e3})):()=>Promise.reject(`❌ Rejected ${o}`).then(()=>console.log("alall")).catch(e=>l.error({title:"Rejected",message:e,position:"topCenter",timeout:2e3})),t)}
//# sourceMappingURL=commonHelpers2.js.map
