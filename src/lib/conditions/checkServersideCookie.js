'use strict';

module.exports = function(settings) {

  var extensionSettings = turbine.getExtensionSettings();
  
  if(typeof(_satellite.cookie.get(extensionSettings.cookieNameServer)) === 'undefined' && typeof(_satellite.cookie.get(extensionSettings.cookieName)) !== 'undefined'){
   
   if(extensionSettings.cross){
    var loc = document.location.host;
    var envShort;
      if(loc.indexOf('-dev')>-1){
        envShort = '-dev';
      }
      else if(loc.indexOf('-int')>-1){
        envShort = '-int';
      }
      else if(loc.indexOf('-vpr')>-1){
        envShort = '-vpr';
      }
      //production
      else{
        envShort = '';
      }

    var queryString = document.location.search;
    if(queryString.indexOf('cssconsent=true') >-1){
      CookieHelper.trackConsent('consent',envShort,'true');
      _satellite.cookie.set(extensionSettings.cookieName, 'true',{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
      return false
    }
    else if(queryString.indexOf('cssconsent=stats') >-1){
      CookieHelper.trackConsent('consent',envShort,'stats');
      _satellite.cookie.set(extensionSettings.cookieName, 'stats',{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
      return false
    }
    else if(queryString.indexOf('cssconsent=marketing') >-1){
      CookieHelper.trackConsent('consent',envShort,'marketing');
      _satellite.cookie.set(extensionSettings.cookieName, 'marketing',{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
      return false
    }
    else if(queryString.indexOf('cssconsent=min') >-1){
      CookieHelper.trackConsent('consent',envShort,'min');
      _satellite.cookie.set(extensionSettings.cookieName, 'min',{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
      return false
    }
    else{
      return true
    }
  }
    else{
      return true
    }
       
  }
  
  else{
    return false
  }

};
