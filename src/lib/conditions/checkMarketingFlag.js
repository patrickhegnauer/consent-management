'use strict';

var cookieHelper = require('../../helpers/cookieHelper');

module.exports = function(settings) {

  var extensionSettings = turbine.getExtensionSettings();

  //sync cookies
  if(_satellite.cookie.get(extensionSettings.cookieNameServer) !== undefined){
    _satellite.cookie.set(extensionSettings.cookieName, _satellite.cookie.get(extensionSettings.cookieNameServer),{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
  } 
  
  if(typeof _satellite.cookie.get(extensionSettings.cookieName) === 'undefined' && typeof(_satellite.cookie.get(extensionSettings.cookieNameServer) === 'undefined')){
    
    return true;
  }
  else{
    return false;
  }

};
