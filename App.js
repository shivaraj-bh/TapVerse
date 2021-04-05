import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import Menu from './js/Menu';
function LoadScreen(){
  return(
    <>
      <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>
            TapVerse
          </Text>
        </View>
    </>);
}
export default () => {
  const [loggedIn, setloggedIn] = useState(0);
  const [user, setUser] = useState([]);
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
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
        // I don't care
        alert('UNKNOWN_ERROR');
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (user){
      setloggedIn(2);
    }else{
      setloggedIn(1);
    }
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
        setloggedIn(1);
    } catch (error) {
      console.error(error);
    }
  };
  if(loggedIn==0){
    return (<LoadScreen/>);
  }else if(loggedIn==1){
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
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={()=>{_signIn()}}
              />
            </View>
          </View>
      </>
    );
  }else{
    return (<Menu username={user.displayName} userProfile={user.photoURL} uid={user.uid} signOut={()=>_signOut()}/>);
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
    fontWeight: '300',
    color: "black",
  },
});