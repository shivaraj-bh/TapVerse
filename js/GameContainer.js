'use strict';
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
  } from 'react-native';
import {ViroVRSceneNavigator} from 'react-viro';
import CountDown from 'react-native-countdown-component';
import firestore from '@react-native-firebase/firestore';
import GameIntro from './GameIntro';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from './LoadingScreen';
var InitialVRScene = require('./Game');
var Sound = require('react-native-sound');
var UNSET = "UNSET";
const styles = StyleSheet.create({
  exitButton : {
      height: 55,
      width: 100,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 30,
      borderWidth: 2,
      borderColor: 'black',
  },
  buttonText: {
      fontSize: 24,
      fontWeight: '400',
      color: "black",
  },
  scoreText: {
      fontSize:20,
      fontWeight:"bold",
      color:'black',
  },
  scoreContainer:{
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
      justifyContent:'space-around',
      flexDirection:'row'
  },
});
let PlaySound = (filename)=>{
  Sound.setCategory('Playback');
  let clickTrack = new Sound(filename+'.wav',Sound.MAIN_BUNDLE,(error)=>{
    if(error){
      console.log(error);
      return;
    }
    clickTrack.play((success)=>{
      if(success){
        console.log("Successfully played");
      }
    });
  }); 
  clickTrack.setVolume(1);
  clickTrack.release();
}
export default function GameContainer(props){
  const [score,setScore] = useState(0);
  const [gameIntro,setGameIntro] = useState(0);
  AsyncStorage.getItem('first_time').then((value)=>{
    if(value!=null){
      setGameIntro(1);
    }else{
      setGameIntro(2);
    }
  });
  console.log("rendered");
  function handleClick(){
      PlaySound('game3');
      setScore(score+1);
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
  function submitScore(){
    const docRef = firestore().collection('users').doc(props.uid);
    firestore().runTransaction(async transaction => {
      const doc = await transaction
      .get(docRef);
      if(doc){
        const newHighScore = Math.max(score,doc.data().highScore);
        transaction.update(docRef,{
          highScore:newHighScore
        });
        return newHighScore;
      }
      return -1;
    })
    .then(newHighScore=>{
      console.log("new high score updated to "+newHighScore);
      props._getExperienceButtonOnPress(UNSET);
    })
    .catch((error)=>{
      console.log(error);
      props._getExperienceButtonOnPress(UNSET);
    });
  }
  function startGame(){
    AsyncStorage.setItem('first_time','true').then(()=>{
      setGameIntro(1);
    });
  }
  if(gameIntro==0){
    return <LoadingScreen/>;
  }
  else if(gameIntro==2){
    return <GameIntro startGame = {()=>startGame()}/>
  }else{
    return (
        <>
          <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
          <View style={{flex:1}}>
            {_getVRNavigator()}
            <View style={styles.timer}>
              <CountDown
                size={20}
                until={60}
                onFinish={() => {submitScore();}}
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
                onPress={()=>props._getExperienceButtonOnPress(UNSET)}
                underlayColor={'#68a0ff'}>
                <Text style={styles.buttonText}>Exit</Text>
              </TouchableHighlight>  
            </View>   
        </View>
      </>);
  }
}
