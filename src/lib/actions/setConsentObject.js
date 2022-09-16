'use strict';

module.exports = function(settings) {
  
  var extensionSettings = turbine.getExtensionSettings();

  if(extensionSettings.ecidService){

    if(_satellite.cookie.get(extensionSettings.cookieNameServer) !== undefined){
      var cookie = _satellite.cookie.get(extensionSettings.cookieNameServer);
    }
    else{
      var cookie = _satellite.cookie.get(extensionSettings.cookieName);
    }

    if(cookie === 'true' || cookie === 'stats'){
    var consent_array = []
    consent_array.push("aa","ecid","target");
    adobe.optIn.approve(consent_array,true);
    adobe.optIn.complete();
  }
  }

  if(extensionSettings.websdk){
    alloy("setConsent", {    
      consent: [{      
        standard: "Adobe",      
        version: "1.0",      
        value: {        general: "in"      }    }
      ]
    });
  }


};
