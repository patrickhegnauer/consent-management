'use strict';

var window = require('@adobe/reactor-window');
var getGtag = require('./initGtag');

module.exports = function(settings) {
try{
var adsevent = settings.conversion + "/" + settings.cLabel;

  gtag('event','conversion', {
    'send_to' : adsevent
  })
}
catch(e){
  TrackingHelper.console(e);
}
};
