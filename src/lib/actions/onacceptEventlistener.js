'use strict';

module.exports = function(settings) {
  window.addEventListener('CookiebotOnAccept', function(e){
    CookieHelper.selection();
    });    
};
