# TapVerse
1) Commit or download the zip onto your system
2) Run npm start from the command line
3) To run the app, open ViroMedia testbed app and enter your laptop's Local IP under the testbed section.

# commands
To generate the index bundle file to run the app on android studio
1) react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 


# TODO: 
1) Make a scorecard and set score as a state variable for scorecard
2) Replace the multiple viro sounds that you are adding with each object with just one speaker, to make the app more efficient
3) Remove drawable and raw folder from android/app/src/main/res
