# TapVerse
1) Commit or download the zip onto your system
2) Run ***react-native run-android***

# INFO
1) After linking react-native firebase google sign in option viro media testbed does not work, alternative is to either generate bundle using the command below and run using android studio or ***react-native run-android***

# commands
To generate the index bundle file to run the app on android studio<br>
1) react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 


# TODO: 
***[done]*** 1) Make a scorecard and set score as a state variable for scorecard <br>
2) Replace the multiple viro sounds that you are adding with each object with just one speaker, to make the app more efficient<br>
3) Remove drawable and raw folder from android/app/src/main/res<br>
***[done]*** 4) Change App.js code for sign in page after checking the bookmark from your chrome <br>
5) Add a exit button in the game screen<br>
***[done]*** 6) Add log out button in the main menu and also add a user name in top right corner or somewhere<br>
7) Check if you change the VR part of the game and generate the bundle will the edit be shown in the app without using ./setup-ide.sh android command (cause this command will fuck up the entire android build at this point)<br>
8) Clean the code (remove unnecessary styles that you declared etc.) and add leaderboard
9) take part in code gladiator and also don't forget about infytq
