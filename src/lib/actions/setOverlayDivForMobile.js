'use strict';

module.exports = function(settings) {
  try{
    window.addEventListener('CookiebotOnDialogDisplay', function(e){
    var cookieBotElement = document.querySelector('#CybotCookiebotDialog');
    if(cookieBotElement) {
      var overlayElement = document.createElement('div');
      overlayElement.classList.add('cookiebot-overlay');
      cookieBotElement.parentNode.insertBefore(overlayElement, cookieBotElement.nextSibling);
       
      var element = document.querySelector('#CybotCookiebotDialog'); 
      var marketing = document.querySelector('#CybotCookiebotDialogBodyLevelButtonMarketingInline')
      var preferences = document.querySelector('#CybotCookiebotDialogBodyLevelButtonPreferencesInline')
      var statistics = document.querySelector('#CybotCookiebotDialogBodyLevelButtonStatisticsInline')
      
      var observer = new MutationObserver(function(mutations) { 
        mutations.forEach(function(mutation) { 
          if (mutation.attributeName === "data-template") { 
            if(mutation.target.dataset.template === 'popup'){ 
              var lang = digitalData.page.pageInfo.language;
                        var text;
                switch(lang){
                  case 'de' :  text = 'Alle bestätigen'; break
                  case 'it' :  text = 'Confermare tutto'; break
                  case 'fr' :  text = 'Confirmer tout'; break
                  case 'en' :  text = 'Confirm all'; break
                             }
              document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').innerText = text;
                        if(marketing && marketing.checked){
                          marketing.click()
                        }
                        if(statistics && statistics.checked){
                          statistics.click()
                        }
                        if(preferences && preferences.checked){
                          preferences.click()
                        }
                       } 
            } 
          }); 
      }); 
    observer.observe(element, { attributes: true });
      
      
    }
      else{
        TMSHelper.console('Element not exists')
      }
    });
    }
    catch(e){
      TMSHelper.console('TMS Fehler: '+ e)
    }
};
