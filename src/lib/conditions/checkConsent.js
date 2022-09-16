'use strict';

var cookieHelper = require('../../helpers/cookieHelper');

module.exports = function(settings) {
  
  var extensionSettings = turbine.getExtensionSettings();

  if(_satellite.cookie.get(extensionSettings.cookieNameServer) !== undefined){
    var cookie = _satellite.cookie.get(extensionSettings.cookieNameServer);
  }
  else{
    var cookie = _satellite.cookie.get(extensionSettings.cookieName);
  }
    
  
  if(cookie === 'true'){
    return true;
  }
  else{
    //case marketing tag
    if(settings.marketing && !settings.stats){
      if(cookie === 'marketing'){
      return true;
      }
      return false;
  }

    //case stats tag
    if(settings.stats && !settings.marketing){
    if(cookie === 'stats'){
      return true;
    }
    return false;
  }

    //case marketing & stats tag
    if(settings.marketing && settings.stats){
    if(cookie === 'stats' || cookie === 'marketing'){
      return true;
    }
    return false;
  }


    return false;
  }
};
