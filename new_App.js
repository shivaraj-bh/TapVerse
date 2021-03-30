// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Button,
// } from 'react-native';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from 'react-native-google-signin';
// import auth from '@react-native-firebase/auth';
// import CountDown from 'react-native-countdown-component';
// var InitialVRScene = require('./js/Game');
// var UNSET = "UNSET";
// var VR_NAVIGATOR_TYPE = "VR";
// var defaultNavigatorType = UNSET;
// export default () => {
//   const [loggedIn, setloggedIn] = useState(false);
//   const [user, setUser] = useState([]);
//   const [navigatorType,setNavigatorType] = useState(defaultNavigatorType);
//   const [score,setScore] = useState(0);
//   _signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const {accessToken, idToken} = await GoogleSignin.signIn();
//       setloggedIn(true);

//       const credential = auth.GoogleAuthProvider.credential(
//         idToken,
//         accessToken,
//       );
//       await auth().signInWithCredential(credential);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         alert('User Cancelled');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         alert('Signin in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         alert('PLAY_SERVICES_NOT_AVAILABLE');
//       } else {
//         alert("Not sure bro!");
//       }
//     }
//   };
//   function onAuthStateChanged(user) {
//     setUser(user);
//     console.log(user);
//     if (user) setloggedIn(true);
//   }
//   useEffect(() => {
//     GoogleSignin.configure({
//       scopes: ['email'], 
//       webClientId:'418977770929-g9ou7r9eva1u78a3anassoqreas466p0.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);
//   signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       auth()
//         .signOut()
//         .then(() => alert('Your are signed out!'));
//       setloggedIn(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   function handleClick(){
//       setScore(score+1);
//   }
//   function _getExpereienceSelector(){
//     return (
//         <View style={localStyles.outer} >
//           <View style={styles.inner} >
  
//             <Text style={styles.titleText}>
//               TapVerse
//             </Text>
//             <TouchableHighlight style={styles.buttons}
//               onPress={_getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
//               underlayColor={'#68a0ff'} >
//               <Text style={styles.buttonText}>Play Game</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       );
//   }
//   function _getVRNavigator() {
//     return (
//       <ViroVRSceneNavigator
//         initialScene={{scene:InitialVRScene}}
//         vrModeEnabled={false}
//         viroAppProps={{onFuse:()=>{handleClick()}}}
//         />
//     );
//   }
//   function _getExperienceButtonOnPress(navigatorType) {
//     return () => {
//       setNavigatorType(navigatorType);
//     }
//   }
//   function _exitViro() {
//     setNavigatorType(UNSET);
//   }
//   if(navigatorType==UNSET){
//       if(!loggedIn){
//         return ( 
//         <>
//           <StatusBar barStyle="dark-content" />
//           <SafeAreaView>
//             <ScrollView
//               contentInsetAdjustmentBehavior="automatic"
//               style={styles.scrollView}>
//               {/* <Header /> */}
    
//               <View style={styles.body}>
//                 <View style={styles.sectionContainer}>
//                   {!loggedIn && (
//                     <GoogleSigninButton
//                       style={{width: 192, height: 48}}
//                       size={GoogleSigninButton.Size.Wide}
//                       color={GoogleSigninButton.Color.Dark}
//                       onPress={this._signIn}
//                     />
//                   )}
//                 </View>
//                 <View style={styles.buttonContainer}>
//                   {!user && <Text>You are currently logged out</Text>}
//                   {user && (
//                     <View>
//                       <Text>Welcome {user.displayName}</Text>
//                       <Button
//                         onPress={this.signOut}
//                         title="LogOut"
//                         color="red"></Button>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </ScrollView>
//           </SafeAreaView>
//         </>
//         );
//     }
//     else{
//         return _getExpereienceSelector();
//     }
//   }else if (navigatorType == VR_NAVIGATOR_TYPE) {
//     return (
//       <View style={{flex:1}}>
//         {_getVRNavigator()}
//       <View style={styles.timer}>
//           <CountDown
//               size={20}
//               until={120}
//               onFinish={() => alert('Finished')}
//               digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
//               digitTxtStyle={{color: '#1CC625'}}
//               timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
//               separatorStyle={{color: '#1CC625'}}
//               timeToShow={['M', 'S']}
//               timeLabels={{m: null, s: null}}
//               showSeparator/>
           
//         </View>
//         <Text style={styles.scoreText}>
//             {score}
//           </Text>           
//     </View>);
//     }
  
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: "blue",
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: "white",
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   buttonContainer: {
//     alignSelf: 'center',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: "black",
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: "yellow",
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: "orange",
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },

//   //Navigator styles
//   scoreText: {
//     position:'absolute',
//     fontSize:40,
//     color:'#ffffff',
//     left:"50%",
//     top:"3%",
//   },
//   timer:{
//     position: 'absolute',
//     left:"5%",
//     top:"3%",
//   },
//   viroContainer :{
//     flex : 1,
//     backgroundColor: "black",
//   },
//   outer : {
//     flex : 1,
//     flexDirection: 'row',
//     alignItems:'center',
//     backgroundColor: "black",
//   },
//   inner: {
//     flex : 1,
//     flexDirection: 'column',
//     alignItems:'center',
//     backgroundColor: "black",
//   },
//   titleText: {
//     paddingTop: 30,
//     paddingBottom: 20,
//     color:'#fff',
//     textAlign:'center',
//     fontSize : 25
//   },
//   buttonText: {
//     color:'#fff',
//     textAlign:'center',
//     fontSize : 20
//   },
//   buttons : {
//     height: 80,
//     width: 150,
//     paddingTop:20,
//     paddingBottom:20,
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor:'#68a0cf',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   exitButton : {
//     height: 50,
//     width: 100,
//     paddingTop:10,
//     paddingBottom:10,
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor:'#68a0cf',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//   }
// });