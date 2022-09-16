module.exports = {
  "extensions": {
    "css-consent-management": {
      "displayName": "CSS Consent Management",
      "settings": {
        "cookieName": "sat_track",
        "cookiebotID": "4edf3480-f8a7-4008-bcc2-e01f9b9ccd2e",
        "ecidService": true,
        "websdk": false,
        "clientside": true,
        "serverside": false
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
  "environment": {
    "id": "EN00000000000000000000000000000000",
    "stage": "development"
  },
  "buildInfo": {
    "turbineVersion": "27.2.1",
    "turbineBuildDate": "2022-05-04T06:26:00.019Z",
    "buildDate": "2022-05-04T06:26:00.019Z",
    "environment": "development"
  }
}