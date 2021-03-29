import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';
import {
  ViroVRSceneNavigator
} from 'react-viro';
import CountDown from 'react-native-countdown-component';
var InitialVRScene = require('./js/Game');
var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var defaultNavigatorType = UNSET;
function GoogleLogin(props){
  const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);
_signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    setloggedIn(true);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      alert('Cancel');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
useEffect(() => {
  GoogleSignin.configure({
    scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
}, []);
signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    setloggedIn(false);
    setuserInfo([]);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
            </View>
            <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={this.signOut}
                  title="LogOut"
                  color="red"></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType : defaultNavigatorType,
      score:0      
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }
  handleClick(){
    this.setState({score:this.state.score+1});
  }
  render() {
    if (this.state.navigatorType == UNSET) {
      return <GoogleLogin/>
      // return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return (
        <View style={{flex:1}}>
          {this._getVRNavigator()}
        <View style={localStyles.timer}>
            <CountDown
                size={20}
                until={120}
                onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
                digitTxtStyle={{color: '#1CC625'}}
                timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: '#1CC625'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator/>
             
          </View>
          <Text style={localStyles.scoreText}>
              {this.state.score}
            </Text>           
      </View>);
      }
    }
  
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            TapVerse
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Play Game</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        initialScene={{scene:InitialVRScene}}
        vrModeEnabled={false}
        viroAppProps={{onFuse:()=>{this.handleClick()}}}
        />
    );
  }
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}
var localStyles = StyleSheet.create({
  scoreText: {
    position:'absolute',
    fontSize:40,
    color:'#ffffff',
    left:"50%",
    top:"3%",
  },
  timer:{
    position: 'absolute',
    left:"5%",
    top:"3%",
  },
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
module.exports = App
