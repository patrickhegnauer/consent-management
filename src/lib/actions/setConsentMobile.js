'use strict';

module.exports = function(settings,event) {
  try{ 
    var button = event.target.id;
    
    // call portal to query native storage
    const api = window.cordova_iab ? window.cordova_iab : window.webkit?.messageHandlers?.cordova_iab;
    
    
    //case1 accept
    if(button == 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'){
      CookieHelper.trackConsent('true',CookieHelper.settings.envShort);
      api?.postMessage('{"type": "setConsent", "consent": "true"}');
    }
    
    //case2 selection
    if(button == 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'){
      CookieHelper.selection();
      if(Cookiebot && Cookiebot.consent){
        var s = Cookiebot.consent.statistics;
        var m = Cookiebot.consent.marketing;
        if(m && !s){
         api?.postMessage('{"type": "hasConsent", "consent": "marketing"}'); 
        }
        if(!m && s){
          api?.postMessage('{"type": "hasConsent", "consent": "statistics"}');
        }
        if(m && s){
          api?.postMessage('{"type": "hasConsent", "consent": "true"}');
        }
      }
      
      
    }
    
    //case3 decline
    if(button == 'CybotCookiebotDialogBodyButtonDecline'){
    CookieHelper.decline();
      api?.postMessage('{"type": "hasConsent", "consent": "false"}');
  }
  }
  catch(e){
    TMSHelper.console('TMS Fehler: ' + e)
  }
};
