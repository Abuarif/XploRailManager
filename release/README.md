# Release Notes for developer

## Android

### Build

`..bash`
ionic cordova build --release android

keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

`..bash`