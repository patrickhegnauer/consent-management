'use strict';

var cookieHelper = require('../../helpers/cookieHelper');

module.exports = function(settings) {
  
  var extensionSettings = turbine.getExtensionSettings();
  const botList = [
    'googlebot',
    'adsbot-google',
    'applebot',
    'bingbot',
    'chrome-lighthouse',
    'headlesschrome/',
    'facebookexternalhit',
    'google-read-aloud',
    'baiuspider',
    'cookiebot',
    'petalbot'
  ]
  const userAgent = navigator.userAgent.toLowerCase();
  const botFlag = false;

  for (let elem of botList) {
    if (userAgent.includes(elem)) {
      botFlag = true
    }
  }

  if(_satellite.cookie.get(extensionSettings.cookieNameServer) !== undefined){
    var cookie = JSON.parse(_satellite.cookie.get(extensionSettings.cookieNameServer)).value;
    if(cookie === undefined){
      cookie = _satellite.cookie.get(extensionSettings.cookieNameServer);
    }
  }
  else{
    var cookie = _satellite.cookie.get(extensionSettings.cookieName);
  }
    
  
  if(cookie === 'true' && botFlag !== true){
    return true;
  }
  else{
    //case marketing tag
    if(settings.marketing && !settings.stats){
      if(cookie === 'marketing' && botFlag !== true){
      return true;
      }
      return false;
  }

    //case stats tag
    if(settings.stats && !settings.marketing){
    if(cookie === 'stats' && botFlag !== true){
      return true;
    }
    return false;
  }

    //case marketing & stats tag
    if(settings.marketing && settings.stats){
    if((cookie === 'stats' || cookie === 'marketing') && botFlag !== true){
      return true;
    }
    return false;
  }


    return false;
  }
};
