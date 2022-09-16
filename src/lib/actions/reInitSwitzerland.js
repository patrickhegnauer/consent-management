'use strict';

module.exports = function(settings) {

  var extensionSettings = turbine.getExtensionSettings();

  //show cookiebanner again, if not clicked
  CookieHelper.init(extensionSettings.cookiebotID, extensionSettings.language);


};
