'use strict';

module.exports = function(settings,event) {
  return new Promise((resolve,reject) => {
    document.body.addEventListener('iab-message', (event) => {
    // message from portal received
    // the detail contains the consent which can be 'undefined', true or false
      try{
        const consent = JSON.parse(event.detail);
      }
      catch(e){
        const consent = event.detail;
      }
      resolve(consent.consent === 'undefined');
     });
  
    // call portal to query native storage
    const api = window.cordova_iab ? window.cordova_iab : window.webkit?.messageHandlers?.cordova_iab;
    api?.postMessage('{"type": "hasConsent"}');
    if(!api){
       if(typeof(_satellite.cookie.get('consent_css')) === 'undefined' && typeof(_satellite.cookie.get('sat_track')) !== 'undefined'){
         resolve(true)
       }
      else{
        resolve(false)
      }
      
    }
  }) 
};
