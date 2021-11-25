'use strict';

const initCookiebot = require("./initCookiebot");

module.exports = function(settings) {
  try {
    if(typeof Cookiebot !== 'undefined'){
    Cookiebot.show(true)
    }
    else{
      //do nothing at the moment
    }
  } catch (error) {
    
  }
};
