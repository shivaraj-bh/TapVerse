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
export default function GameContainer(props){
  Sound.setCategory('Playback');
  var mainTrack = new Sound('game1_mod1.wav',Sound.MAIN_BUNDLE,(error)=>{
    if(error){
      alert("Error while loading");
      return;
    }
    // alert("Succefully loaded the song");
  });
  var clickTrack = new Sound('game3.wav',Sound.MAIN_BUNDLE);
  var endTrack = new Sound('game2.wav',Sound.MAIN_BUNDLE);
  const [score,setScore] = useState(0);
  function handleClick(){
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
              onPress={()=>props._getExperienceButtonOnPress(UNSET)}
              underlayColor={'#68a0ff'}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableHighlight>  
          </View>   
      </View>
    </>);
}
