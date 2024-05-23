'use strict';

module.exports = function(settings) {
  try{
    const searchParams = new URLSearchParams(window.location.search);
    //call getChash if dataLayer contains chash
    if (digitalData && digitalData.user && digitalData.user.userInfo && digitalData.user.userInfo.chash){
      CookieHelper.getChash(digitalData.user.userInfo.chash.toUpperCase(), CookieHelper.settings.envShort);
    }
    //call getChash if userInfo cookie contains chash
    else if (CookieHelper.getCookie('userInfo').chash !== undefined) {
      CookieHelper.getChash(JSON.parse(CookieHelper.getCookie('userInfo')).chash.toUpperCase(), CookieHelper.settings.envShort);
    }
    //call getChash if querystring contains chash
    else if(searchParams.has('chash')){
      getChash(searchParams.get('chash').toUpperCase(),CookieHelper.settings.envShort)
  }
  } catch(e) {
    CookieHelper.console('TMS Fehler: ' + e)
  }
};
