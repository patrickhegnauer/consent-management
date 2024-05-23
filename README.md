# consent-management
Handling Consent Management via Cookiebot and Adobe Launch


# Features

## Extension Config
- Set the according Cookiescript ID which can be found on manage.cookiebot.com
- Set the name of the consent cookie
- Choose which Consent Service is active

## Actions
### Init Cookiebot
#### Description:
This Action initialise the Cookiebot Script. It provides the Cookiebot Object. In the configuration must be added a Data Element which should return the corresponding language code like de/fr/it/en

#### Usage
Add this Action to a Library Loaded Rule. Include the Check Consent Cookie Condition, to not load Cookiebot twice.

### Set Consent Object
#### Description:
This Action initialise the Cookiebot Script. It provides the Cookiebot Object. In the configuration must be added a Data Element which should return the corresponding language code like de/fr/it/en

#### Usage
Add this Action to a Library Loaded Rule. Include the Check Consent Cookie Condition, to not load Cookiebot twice.

### Show Cookie Settings
#### Description:
This Action does provide an event listener which shows the cookie settings dialog.

#### Usage
Add this action based on the custom event "event-action-settings". This event should be called in the privacy statement on the webpage. 

### Show Cookiebot
#### Description:
This Action provides an additional method to show the Cookiebot Banner. As per default the banner is only shown in the EU.

#### Usage
Add this action based on the custom event "event-action-consent". So it is called only once. Make sure to add a Condition which checks if the country is Switzerland by check of the userCountry of Cookiebot is equal to CH. Also add an Max Frequency of 1 per Pageview, so it is shown only once. 

### Set cHash Cookie
#### Description:
This Actions sets the cHash Cookie based on the available information (Data Layer, Cookie, Query String)

#### Usage
Add this Action to a rule, and check if the cookie isn't already set.

## Conditions
### Check Consent
#### Description:
This Condition checks if the Consent Cookie defined in the Extension Settings is true,marketing or Statistics.

#### Usage
In the configuration choose the corresponding checkbox, if the rule triggers a marketing, a statistic or both tag(s). If both are checked, make sure to add a condition in the custom code of the according action. 

### Check Consent Cookie
#### Description:
This Condition checks if the Consent Cookie defined in the Extension Settings is present or not. 

#### Usage
Use this Condition in the "Init Cookiebot" Action, as this Rule has only to run if the Cookie is not present.
