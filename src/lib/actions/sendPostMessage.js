'use strict';

module.exports = function(settings,event) {
  try{

    document.body.addEventListener('iab-message', (event) => {
    // message from portal received
    // the detail contains the consent which can be 'undefined', true or false
    console.log(event, event.detail.consent);
  });
  
  // call portal to query native storage
  const api = window.cordova_iab ? window.cordova_iab : window.webkit?.messageHandlers?.cordova_iab;
  api?.postMessage('{"type": "hasConsent"}');
      
  }
  catch(e){
    console.log(e);
  }
};
