'use strict';

module.exports = function(settings) {
  window.addEventListener('CookiebotOnDecline', function(e){
    CookieHelper.decline();
    });  
};
