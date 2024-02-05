'use strict';

module.exports = function(settings) {
  if(_satellite.cookie.get('CookieConsent') !== undefined && _satellite.cookie.get('consent_css') === undefined){
    _satellite.cookie.set('CookieConsent','')
  }
};
