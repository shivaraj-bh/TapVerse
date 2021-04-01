import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import {
  ViroVRSceneNavigator
} from 'react-viro';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import CountDown from 'react-native-countdown-component';
var InitialVRScene = require('./js/Game');
var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var defaultNavigatorType = UNSET;
var Sound = require('react-native-sound');
export default () => {
  Sound.setCategory('Playback');
  var mainTrack = new Sound('game1_mod1.wav',Sound.MAIN_BUNDLE,(error)=>{
    if(error){
      alert("Error while loading");
      return;
    }
    alert("Succefully loaded the song");
  });
  var clickTrack = new Sound('game3.wav',Sound.MAIN_BUNDLE);
  var endTrack = new Sound('game2.wav',Sound.MAIN_BUNDLE);
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [navigatorType,setNavigatorType] = useState(defaultNavigatorType);
  const [score,setScore] = useState(0);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      // setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert(error);
        // alert("Not sure bro!");
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) setloggedIn(true);
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], 
      webClientId:'1091570673429-ruv6tc2urr6rtql664q97tfgu39kgflb.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
        // setUser([]);
        setloggedIn(false);
      
    } catch (error) {
      console.error(error);
    }
  };
  function handleClick(){
      setScore(score+1);
  }
  function _getExpereienceSelector(){
    return (
      <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.menuHeader}>
            <Text style={styles.sectionTitle}>
              TapVerse
            </Text>
            <Text style={styles.sectionDescription}>Welcome {user.displayName}</Text>
          </View>
            <View style={styles.inner}>
              <TouchableHighlight style={styles.buttons}
                onPress={_getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Play Game</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttons}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Leaderboard</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttons}
                onPress={()=>{_signOut()}}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableHighlight>
            </View>
      </ScrollView>
      );
  }
  function _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        initialScene={{scene:InitialVRScene}}
        vrModeEnabled={false}
        viroAppProps={{onFuse:()=>{handleClick()}}}
        />
    );
  }
  function _getExperienceButtonOnPress(navigatorType) {
    return () => {
      setNavigatorType(navigatorType);
    }
  }
  function _exitViro() {
    setNavigatorType(UNSET);
  }
  if(navigatorType==UNSET){
      if(!loggedIn){
        return ( 
        <>
          <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
            <View style={styles.body}>
              <Text style={styles.sectionTitle}>
                TapVerse
              </Text>
              <Text style={styles.sectionDescription}>
                Login
              </Text>
              <View style={styles.sectionContainer}>
                {!loggedIn && (
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={()=>{_signIn()}}
                  />
                )}
              </View>
            </View>
        </>
        );
    }
    else{
        return _getExpereienceSelector();
    }
  }else if (navigatorType == VR_NAVIGATOR_TYPE) {
    return (
      <>
        <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
        <View style={{flex:1}}>
          {_getVRNavigator()}
          <View style={styles.timer}>
            <CountDown
              size={20}
              until={60}
              onFinish={() => alert('Finished')}
              digitStyle={{borderWidth: 2, borderColor: 'black'}}
              digitTxtStyle={{color: 'black'}}
              timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
              separatorStyle={{color: 'black'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator/>
            <TouchableHighlight
              style={styles.scoreContainer}
              underlayColor={'#68a0ff'}>
              <Text style={styles.scoreText}>
                {score}
              </Text>
            </TouchableHighlight>
                
            <TouchableHighlight style={styles.exitButton}
              onPress={_getExperienceButtonOnPress(UNSET)}
              underlayColor={'#68a0ff'}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableHighlight>  
          </View>   
      </View>
    </>);
    }
  
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 20,
    fontStyle:'italic',
    fontWeight: '350',
    color: "black",
  },

  //Navigator styles
  scoreText: {
    fontSize:20,
    fontWeight:"bold",
    color:'black',
  },
  scoreContainer:{
    // marginTop:3,
    height: 55,
    width: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
    
  },
  timer:{
    position:'absolute',
    top:"2%",
    width:"100%",
    // flexWrap:'wrap',
    justifyContent:'space-around',
    flexDirection:'row'
  },
  menuHeader : {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor: "white",
  },
  inner: {
    flex:2,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "white",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    color: "black",
  },
  buttons : {
    height: 60,
    width: 250,
    marginBottom:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  exitButton : {
    height: 55,
    width: 100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  }
});