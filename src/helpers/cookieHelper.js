'use strict';
var extensionSettings = turbine.getExtensionSettings();
var window = require('@adobe/reactor-window');

window.CookieHelper = window.CookieHelper || {};

try {

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

  CookieHelper.settings = {
    cookieNameClient : extensionSettings.cookieName,
    cookieNameServer : extensionSettings.cookieNameServer,
    websdk : extensionSettings.websdk,
    ecid : extensionSettings.ecidService,
    clientside : extensionSettings.clientside,
    serverside : extensionSettings.serverside,
    swiss : extensionSettings.swiss,
    cookiebotID : extensionSettings.cookiebotID,
    envShort : envShort
  }

    // console: logs to the console if the dev console exists
    CookieHelper.console = function(text)
  {
   if (typeof window.console !== "undefined")
        {
        if (typeof window.console.log !== "undefined" &&  _satellite.environment.stage !== 'production')
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

  CookieHelper.accept = function(){

    var consent_array = [];
      _satellite.cookie.set('sat_track', 'true',{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
     consent_array.push("aa");
     consent_array.push("ecid");
     consent_array.push("target");
      
   //ecid service
if(extensionSettings.ecidService){
  adobe.optIn.approve(consent_array,true);
  adobe.optIn.complete();
}

    var event = new CustomEvent('event-action-consent', {
      detail: {
        eventCategory: 'User Interaktion',
        eventAction: 'Passiv Consent',
        eventLabel: 'On Accept'
      }
      });
      document.body.dispatchEvent(event);

  }

  CookieHelper.decline = function(){
    //old section - clientside
    if(extensionSettings.clientside){
      _satellite.cookie.set(extensionSettings.cookieName, 'false',{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
      }
       //new section as of 1.4.0 - serverside
      if(extensionSettings.serverside){
          CookieHelper.trackConsent('min', CookieHelper.settings.envShort);
    }

    //ecid service
    if(extensionSettings.ecidService){
      adobe.optIn.deny(["aa","ecid","target"],true)
      adobe.optIn.complete();
      }
      //web sdk
      else if(extensionSettings.websdk){

        alloy("setConsent", {    
          consent: [{      
            standard: "Adobe",      
            version: "1.0",      
            value: {        general: "out"      }    }
          ]
        });

      }

      if(localStorage && CookieConsent){
        localStorage.setItem('consentID', CookieConsent.consentID)
        localStorage.setItem('consentUTC', CookieConsent.consentUTC)
        localStorage.setItem('consentValue', JSON.stringify(CookieConsent.consent))
      }

  }

  CookieHelper.selection = function(){

    var s = Cookiebot.consent.statistics;
    var m = Cookiebot.consent.marketing;

    var consent_array = [];
    var consentFlag;
        if(m && s){
            consentFlag = "true";
            consent_array.push("aa");
            consent_array.push("ecid");
            consent_array.push("target");
       }
        if(m && !s){
            consentFlag = "marketing";
      }
        if(!m && s){
            consentFlag = "stats";
            consent_array.push("aa");
            consent_array.push("ecid");
            consent_array.push("target");
      }
            //clientside
            if(extensionSettings.clientside){
            _satellite.cookie.set(extensionSettings.cookieName, consentFlag,{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
            }
            //serverside
            if(extensionSettings.serverside){
                CookieHelper.trackConsent(consentFlag,CookieHelper.settings.envShort);
          }  

//ecid service
if(extensionSettings.ecidService){
    adobe.optIn.approve(consent_array,true);
    adobe.optIn.complete();
  }

  //web sdk
  else if(extensionSettings.websdk){
    if(consentFlag == 'stats' || consentFlag == "true"){
    alloy("setConsent", {    
      consent: [{      
        standard: "Adobe",      
        version: "1.0",      
        value: {        general: "in"      }    }
      ]
    });
  }
  else{
    alloy("setConsent", {    
      consent: [{      
        standard: "Adobe",      
        version: "1.0",      
        value: {        general: "out"      }    }
      ]
    });
  }
  }

  if(localStorage && CookieConsent){
    localStorage.setItem('consentID', CookieConsent.consentID)
    localStorage.setItem('consentUTC', CookieConsent.consentUTC)
    localStorage.setItem('consentValue', JSON.stringify(CookieConsent.consent))
  }
    
  }

CookieHelper.init = function(src,lang){
  var CookiebotScriptContainer = document.getElementsByTagName('script')[0];
  var CookiebotScript = document.createElement("script");
  CookiebotScript.type = "text/javascript";
  CookiebotScript.async = true;
  CookiebotScript.id = "Cookiebot";
  CookiebotScript.src = "https://consent.cookiebot.com/uc.js?cbid="+ src;
   
  // Dynamic language via URL, not browser agent  
  var currentUserPagePathname = lang;
  var currentUserPageCulture = "de";
  
  if (currentUserPagePathname === "fr") {
    currentUserPageCulture = "fr";
  }
  if (currentUserPagePathname === "it") {
    currentUserPageCulture = "it";
  }
  if (currentUserPagePathname === "en") {
    currentUserPageCulture = "en";
  }
  if(CookieHelper.settings.swiss){
    if(extensionSettings.cross && document.location.search.indexOf('cssconsent=') >-1){
      //enabled and contains query => not showing banner
    }
    else{
      //either not activated or not containing query => show banner
      CookiebotScript.setAttribute("data-georegions", "{'region':'CH','cbid':'47975769-adfa-4ec3-986a-3603dff279a8'}" );
    }
  }
  
  CookiebotScript.setAttribute("data-culture", currentUserPageCulture);
  CookiebotScriptContainer.parentNode.insertBefore(CookiebotScript, CookiebotScriptContainer);
}
    
} catch (error) {
    
}