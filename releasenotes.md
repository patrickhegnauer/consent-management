# Release Notes
## Wedge v2.1.16
- Replaced old Consent Endpoints (true/min/marketing/stats) with a generic one (trackConsent function)
- De- and encryption of Cookie values
## Wedge v2.1.9
- Added Domain for Configuration (for setting Cookies flexible on every domain, not only .css.ch)
- New Cookie Handling - Setting Cookies through GET not POST to add more Attributes
## Wedge v2.1.7
- Added decoding for CookieHelper.getCookie()
## Wedge v2.1.6
- Improved Eventlistener for Accept / Decline
## Wedge v2.1.5
- Improved CookieHelper.selection()
## Wedge v2.0.4 - v2.1.4
- Added new mobile components
- Bug fixing
## Wedge v2.0.3
- Set Consent ID on Callback Accept
## Wedge v2.0.2
- Bug fixing "adobe is not defined". In case ECID is not installed, the extension should check which ID Service is activated.
## Wedge v2.0.1
- Bug fixing "init component"
## Wedge v2.0.0
- Added support for add consent in Switzerland
- Added multiple actions and configurations for switzerland

## Potato v1.5.5
- Changed deprecated _satellite.buildInfo to _satellite.environment.stage
## Potato v1.4.2
- Bug fixing "serverside component"
## Potato v1.4.1
- Bug fixing "serverside component"
## Potato v1.4.0
- Added a new UI Component to choose if cookie is set client- or serverside
- Added serverside code for setting cookie via css cookie service
## Potato v1.3.2
- Added Handling for marketing and statistic tags
## Potato v1.3.1
- Added UI for marketing and statistic tags
## Potato v1.3.0
- Bug fixes
## Potato v1.2.0 
- Added Eventlistener for Cookie Settings
- Added Rule for displaying Cookiebanner in CH
- Marketing Pixel UI (deprecated)
## Potato v1.1.0 
- Condition for Init Cookiebot
- Condition for Consent Cookie
- Action for Init Cookiebot
- Set Application Language
- Send Custom Event for triggering Calls
## Potato v1.0.0 
- Initial Features deployed on DEV
- Configuration UI
