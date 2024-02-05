'use strict';

module.exports = function(settings,event) {

  var extensionSettings = turbine.getExtensionSettings();

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
        //sync cookies
  if(_satellite.cookie.get(extensionSettings.cookieNameServer) !== undefined){
    _satellite.cookie.set(extensionSettings.cookieName, _satellite.cookie.get(extensionSettings.cookieNameServer) .indexOf('value') >-1 ? JSON.parse(_satellite.cookie.get(extensionSettings.cookieNameServer)).value : _satellite.cookie.get(extensionSettings.cookieNameServer),{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
  } 
  
  if(typeof _satellite.cookie.get(extensionSettings.cookieName) === 'undefined' && typeof(_satellite.cookie.get(extensionSettings.cookieNameServer) === 'undefined')){
    
    resolve(true);
  }
  else{
    resolve(false);
  }
    }
  }) 
};
