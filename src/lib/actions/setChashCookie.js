'use strict';

module.exports = function(settings) {
  try{
    //call getChash if dataLayer contains chash
    if (digitalData && digitalData.user && digitalData.user.userInfo && digitalData.user.userInfo.chash){
      CookieHelper.getChash(digitalData.user.userInfo.chash, CookieHelper.settings.envShort);
    }
    //call getChash if userInfo cookie contains chash
    else if (CookieHelper.getCookie('userInfo').chash !== undefined) {
      CookieHelper.getChash(JSON.parse(CookieHelper.getCookie('userInfo')).chash, CookieHelper.settings.envShort);
    }
  } catch(e) {
    CookieHelper.console('TMS Fehler: ' + e)
  }
};
