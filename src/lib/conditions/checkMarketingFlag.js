'use strict';

var cookieHelper = require('../../helpers/cookieHelper');

module.exports = function(settings) {

  var extensionSettings = turbine.getExtensionSettings();
  
  if(typeof _satellite.cookie.get(extensionSettings.cookieName) === 'undefined'){
    
    return true;
  }
  else{
    return false;
  }

};
