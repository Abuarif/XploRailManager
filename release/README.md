# Release Notes for developer

## Android

### Build

Generate a release build for Android

```bash

ionic cordova build --release android

```

Generate our private key using the keytool command

```bash

keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

```

Sign the unsigned APK

```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore /Users/suhaimimaidin/Projects/Xplorail/ionic2-xplorail/platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name

```

Zip align tool to optimize the APK

```bash
~/Library/Android/sdk/build-tools/22.0.1/zipalign -v 4 /Users/suhaimimaidin/Projects/Xplorail/ionic2-xplorail/platforms/android/build/outputs/apk/android-release-unsigned.apk ~/Desktop/XploRail.apk
```
