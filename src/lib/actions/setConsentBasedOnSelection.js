'use strict';

module.exports = function(settings) {
  try{ 
    var button = event.target.id;
    
    //case1 accept
    if(button == 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'){
      CookieHelper.trackConsent('consent',CookieHelper.settings.envShort,'true');
    }
    
    //case2 selection
    if(button == 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection'){
      CookieHelper.selection();
    }
    
    //case3 decline
    if(button == 'CybotCookiebotDialogBodyButtonDecline'){
    CookieHelper.decline();
  }
  }
  catch(e){
    TMSHelper.console('TMS Fehler: ' + e)
  }
};
