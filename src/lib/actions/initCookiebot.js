
var cookieHelper = require('../../helpers/cookieHelper');
var window = require('@adobe/reactor-window');
var document = require('@adobe/reactor-document');

module.exports = function(settings) {
  
  try {
    var extensionSettings = turbine.getExtensionSettings();

    var CookiebotScriptContainer = document.getElementsByTagName('script')[0];
    var CookiebotScript = document.createElement("script");
    CookiebotScript.type = "text/javascript";
    CookiebotScript.async = true;
    CookiebotScript.id = "Cookiebot";
    CookiebotScript.src = "https://consent.cookiebot.com/uc.js?cbid="+ extensionSettings.cookiebotID;
     
    // Dynamic language via URL, not browser agent  
    var currentUserPagePathname = settings.language;
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
    
    
    CookiebotScript.setAttribute("data-culture", currentUserPageCulture);
    CookiebotScriptContainer.parentNode.insertBefore(CookiebotScript, CookiebotScriptContainer);
    
        
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

      var consent_array = [];
      var marketing_flag = "pending";
           
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
    
            _satellite.cookie.set(extensionSettings.cookieName, consentFlag,{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
          
      
      //send custom event to trigger rules
      var event = new CustomEvent('event-action-consent', {
          detail: {
            eventCategory: 'User Interaktion',
            eventAction: 'Passiv Consent',
            eventLabel: 'On Accept'
          }
          });
          document.body.dispatchEvent(event);
            }
    
    CookiebotCallback_OnDecline = function()     {
     
      cookie_consent_state.preferences = 'false';
      cookie_consent_state.statistics = 'false';
      cookie_consent_state.marketing = 'false';
      _satellite.cookie.set(extensionSettings.cookieName, 'false',{ expires: 365, domain:'.css.ch', path:'/', SameSite:'Lax',secure:true });
    
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
    
    }

  } catch (error) {
    
CookieHelper.console('TMSFehler: ' + error)

  }
};
