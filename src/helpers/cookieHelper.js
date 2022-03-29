'use strict';
var extensionSettings = turbine.getExtensionSettings();
var window = require('@adobe/reactor-window');

window.CookieHelper = window.CookieHelper || {};

try {

    // console: logs to the console if the dev console exists
    CookieHelper.console = function(text)
  {
   if (typeof window.console !== "undefined")
        {
        if (typeof window.console.log !== "undefined" &&  _satellite.buildInfo.environment !== 'production')
          {
          window.console.log(text);
          }
        }
  }; 

// getCookie
CookieHelper.getCookie= function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
};

//setCookie
CookieHelper.setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.css.ch;path=/;SameSite=Lax;secure=true";
};


CookieHelper.trackConsent = function(endpoint,environment){
 
  var xhr = new XMLHttpRequest();
  xhr.open("GET", 'https://consent'+ environment +'.css.ch/' + endpoint, true);           //endpoint => true/min/stats/marketing       //environment => -dev/-int/-vpr
   
  //Send the proper header information along with the request
  //xhr.setRequestHeader("Content-Type", "application/json");
  xhr.withCredentials = true;
  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          var response = xhr;
           //console.log(response.statusText)
      }
  }
  //send consent data
  xhr.send();
  }


    
} catch (error) {
    
}