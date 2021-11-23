'use strict';
var window = require('@adobe/reactor-window');
var document = require('@adobe/reactor-document');

module.exports = function(settings) {
 try{
  window.googleTag = window.googleTag || [];
window.gtag = function gtag(){googleTag.push(arguments);}
gtag('js', new Date());

gtag('config', settings.gtagGlobalId);
//gtag('config', 'AW-396492087');

var script = document.createElement("script");
script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + settings.gtagGlobalId + "&l=googleTag");
script.setAttribute("async", "async");
document.getElementsByTagName("head")[0].appendChild(script);

 }
 catch(e){
   console.log(e);
 }
};
