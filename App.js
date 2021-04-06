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
import firestore from '@react-native-firebase/firestore';
import Menu from './js/Menu';
import LoadingScreen from './js/LoadingScreen';
export default () => {
  let isSubscriber = true;
  const [user, setUser] = useState({user:null,loggedIn:0});
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
  async function setFirestoreData(){
    if(!isSubscriber)return;
    await firestore()
      .collection('users')
      .doc(user.user.uid)
      .get()
      .then(documentSnapshot=>{
        console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists===false){
          firestore()
          .collection('users')
          .doc(user.user.uid)
          .set({userName:user.user.displayName,
            highScore:-1,
            iconURL:user.user.photoURL})
          .then(()=>console.log("initial data uploaded to firestore"))
          .catch((error)=>{
            console.log(error);
          });
        }else{
          console.log('User data: ', documentSnapshot.data());
        }
      });
      
  }
  function onAuthStateChanged(user) {
    if(!isSubscriber)return;
    setUser({
      user:user,
      loggedIn:user?2:1
    });
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], 
      webClientId:'1091570673429-ruv6tc2urr6rtql664q97tfgu39kgflb.apps.googleusercontent.com',
      offlineAccess: true,
    });
    auth().onAuthStateChanged(onAuthStateChanged);
    return ()=>{isSubscriber=false};
  }, []);
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
        setUser({
          user:null,
          loggedIn:1
        });
    } catch (error) {
      console.error(error);
    }
  };
  if(user.loggedIn==0){
    return (<LoadingScreen/>);
  }else if(user.loggedIn==1){
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
    setFirestoreData();
    return (<Menu username={user.user.displayName} uid={user.user.uid} signOut={()=>_signOut()}/>);
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