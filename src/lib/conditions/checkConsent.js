'use strict';

var cookieHelper = require('../../helpers/cookieHelper');

module.exports = function(settings) {
  
  var extensionSettings = turbine.getExtensionSettings();
  
  if(_satellite.cookie.get(extensionSettings.cookieName) === 'true'){
    return true;
  }
  else{
    return false;
  }
};
