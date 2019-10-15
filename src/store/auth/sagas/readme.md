# Auth flow

## authFlow
Controls signing in and out of the app. Authentication and authorization is using ADAL for react-native, interfaced by some helpers in ```src/services/adal.js```.

## mockedAuthFlow
Bypasses authentication. Useful when working with mocked api methods. Toggle on/off and configure in ```src/mock-config.js```.
