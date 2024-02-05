
var cookieHelper = require('../../helpers/cookieHelper');
var window = require('@adobe/reactor-window');
var document = require('@adobe/reactor-document');

module.exports = function(settings) {
  
  try {

    var extensionSettings = turbine.getExtensionSettings();

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

    CookieHelper.init(extensionSettings.cookiebotID,extensionSettings.language);  
        
      //set data elements true if cookie is true
      if(_satellite.cookie.get(extensionSettings.cookieName) === 'true'){
        var cookie_consent_state = {};
        cookie_consent_state.preferences = 'true';
        cookie_consent_state.statistics = 'true';
        cookie_consent_state.marketing = 'true';
      }
      else{
        //set data elements to false if cookie not exists
        var cookie_consent_state = {};
        cookie_consent_state.preferences = 'false';
        cookie_consent_state.statistics = 'false';
        cookie_consent_state.marketing = 'false'; 
        CookieHelper.console('Cookiebot: Basic set consent false');
      }
    
    //checks on accept if the selection of the user is checked or not
   
     CookiebotCallback_OnAccept = function() {

      if(_satellite.cookie.get(extensionSettings.cookieName) === 'true'){
        if(localStorage && CookieConsent){
          localStorage.setItem('consentID', CookieConsent.consentID)
          localStorage.setItem('consentUTC', CookieConsent.consentUTC)
          localStorage.setItem('consentValue', JSON.stringify(CookieConsent.consent))
        }
        /*set serverside cookie in CH - after OK Click
        if(extensionSettings.serverside){
          CookieHelper.trackConsent('consent',envShort, 'true);
    }*/
      }
      else{

      var consent_array = [];
      
           
       var p = Cookiebot.consent.preferences,
            s = Cookiebot.consent.statistics,
            m = Cookiebot.consent.marketing;
       var consentFlag;

       if(m && s){
        consentFlag = "true";
       }
       if(m && !s){
        consentFlag = "marketing"; 
      }
      if(!m && s){
        consentFlag = "stats"; 
      }

          //check if its via ecid service
           if(extensionSettings.ecidService){
            if(s){
              consent_array.push("aa");
              consent_array.push("ecid");
              consent_array.push("target");
              

            adobe.optIn.approve(consent_array,true);
            adobe.optIn.complete();
          }
          }
            //check if its websdk
            if(extensionSettings.websdk){
              alloy("setConsent", {    
                consent: [{      
                  standard: "Adobe",      
                  version: "1.0",      
                  value: {        general: "in"      }    }
                ]
              });
            }
            
            //old section - clientside
            if(extensionSettings.clientside){
            _satellite.cookie.set(extensionSettings.cookieName, consentFlag,{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
            }
            
             //new section as of 1.4.0 - serverside
            if(extensionSettings.serverside){
                CookieHelper.trackConsent('consent',envShort,consentFlag);
          }
      
      //send custom event to trigger rules
      var event = new CustomEvent('event-action-consent', {
          detail: {
            eventCategory: 'User Interaktion',
            eventAction: 'Passiv Consent',
            eventLabel: 'On Accept'
          }
          });
          document.body.dispatchEvent(event);

          if(localStorage && CookieConsent){
            localStorage.setItem('consentID', CookieConsent.consentID)
            localStorage.setItem('consentUTC', CookieConsent.consentUTC)
            localStorage.setItem('consentValue', JSON.stringify(CookieConsent.consent))
          }

            }
          }
              
    CookiebotCallback_OnDecline = function()     {
    
      cookie_consent_state.preferences = 'false';
      cookie_consent_state.statistics = 'false';
      cookie_consent_state.marketing = 'false';

      //old section - clientside
      if(extensionSettings.clientside){
      _satellite.cookie.set(extensionSettings.cookieName, 'false',{ expires: 365, domain:extensionSettings.domainTopLevel, path:'/', SameSite:'Lax',secure:true });
      }
       //new section as of 1.4.0 - serverside
       if(extensionSettings.serverside){
     CookieHelper.trackConsent('consent',envShort,'min');
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
    //set consent in switzerland without click
    CookiebotCallback_OnDialogDisplay = function(){
      if(Cookiebot.userCountry === 'CH'){
        CookieHelper.accept();
      }
    }
    

  } catch (error) {
    
CookieHelper.console('TMSFehler: ' + error)

  }
};
