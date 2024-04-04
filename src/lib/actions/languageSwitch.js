'use strict';

module.exports = function(settings,event) {
  try{
    if(Cookiebot){
      document.querySelector('#Cookiebot').setAttribute('data-culture', event.detail.language)
      Cookiebot.show(true)
  }
}
catch(e){

}
};
