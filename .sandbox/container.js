module.exports = {
  "extensions": {
    "css-consent-management": {
      "displayName": "CSS Consent Management",
      "settings": {
        "cookieName": "sat_track",
        "cookiebotID": "b5f6c34c-7d5b-4fac-ac35-8ff9fbee649b",
        "ecidService": true,
        "websdk": false,
        "facebookFlag": false,
        "bingFlag": false,
        "floodlightFlag": false,
        "adwordsFlag": false,
        "facebookElement": "",
        "bingElement": "",
        "floodlightElement": "",
        "adwordsElement": ""
      }
    }
  },
  "dataElements": {
    "Language": {
      "settings": {
        "name": "language"
      },
      "cleanText": false,
      "forceLowerCase": false,
      "modulePath": "sandbox/localStorage.js",
      "storageDuration": "pageview"
    }
  },
  "rules": [{
    "id": "RL1637592435022",
    "name": "Init Cookiebot",
    "events": [{
      "modulePath": "sandbox/pageTop.js",
      "settings": {}
    }],
    "conditions": [{
      "modulePath": "css-consent-management/src/lib/conditions/checkMarketingFlag.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "css-consent-management/src/lib/actions/initCookiebot.js",
      "settings": {
        "language": "%Language%"
      }
    }]
  }, {
    "id": "RL1637592462441",
    "name": "Set Consent Object",
    "events": [{
      "modulePath": "sandbox/pageTop.js",
      "settings": {},
      "order": "150"
    }],
    "conditions": [{
      "modulePath": "css-consent-management/src/lib/conditions/checkConsent.js",
      "settings": {}
    }],
    "actions": [{
      "modulePath": "css-consent-management/src/lib/actions/setConsentObject.js",
      "settings": {}
    }]
  }],
  "property": {
    "settings": {
      "domains": ["example.com"],
      "linkDelay": 100,
      "trackingCookieName": "sat_track",
      "undefinedVarsReturnEmpty": false
    }
  },
  "company": {
    "orgId": "ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg"
  },
  "buildInfo": {
    "turbineVersion": "27.2.0",
    "turbineBuildDate": "2021-11-22T14:48:24.018Z",
    "buildDate": "2021-11-22T14:48:24.018Z",
    "environment": "development"
  }
}