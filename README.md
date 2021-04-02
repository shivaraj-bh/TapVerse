# TapVerse
1) Commit or download the zip onto your system
2) Run ***react-native run-android***

# INFO
1) After linking react-native firebase google sign in option viro media testbed does not work, alternative is to either generate bundle using the command below and run using android studio or ***react-native run-android --variant=<debug variant>***
2) debug variant for this app is ***gvrDebug***
3) Run the metro bundler, using react-native start, before running "react-native run-android --variant=gvrDebug"

# commands
To generate the index bundle file to run the app on android studio<br>
1) react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 


# TODO: 
***[done]*** 1) Make a scorecard and set score as a state variable for scorecard <br>
2) Replace the multiple viro sounds that you are adding with each object with just one speaker, to make the app more efficient<br>
***[noted]*** 3) Remove drawable and raw folder from android/app/src/main/res<br>
***[done]*** 4) Change App.js code for sign in page after checking the bookmark from your chrome <br>
***[done]*** 5) Add a exit button in the game screen<br>
***[done]*** 6) Add log out button in the main menu and also add a user name in top right corner or somewhere<br>
***[done]*** 7) Check if you change the VR part of the game and generate the bundle will the edit be shown in the app without using ./setup-ide.sh android command (cause this command will fuck up the entire android build at this point)<br>
***[done]*** 8) Clean the code (remove unnecessary styles that you declared etc.) and add leaderboard<br>
***[done]*** 9) take part in code gladiator and also don't forget about infytq<br>
10) Take part in code gladiator ML challenge and practice DBMS for infytq qualifiers<br>
11) Don't load the sound files on every re-render (prolly make them global, 'cause they are not going to be changed at any point)<br>
12) remove sound attached to each viroSound<br>
