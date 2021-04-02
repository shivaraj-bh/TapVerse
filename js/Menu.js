'use strict';
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
    ScrollView
  } from 'react-native';
import GameContainer from './GameContainer';
import LeaderBoard from './Leaderboard';
var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var LEADERBOARD_NAVIGATOR_TYPE = "LEADERBOARD";
function mainMenu(props){
  return (
    <>
      <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
      <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.menuHeader}>
            <Text style={styles.sectionTitle}>
              TapVerse
            </Text>
            <Text style={styles.sectionDescription}>Welcome {props.username}!</Text>
          </View>
            <View style={styles.inner}>
              <TouchableHighlight style={styles.buttons}
                onPress={()=>props.setNav(VR_NAVIGATOR_TYPE)}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Play Game</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttons}
                onPress={()=>props.setNav(LEADERBOARD_NAVIGATOR_TYPE)}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Leaderboard</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.buttons}
                onPress={()=>{props.signOut()}}
                underlayColor={'black'} >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableHighlight>
            </View>
      </ScrollView>
    </>
  );
}
function playGame(props){
    return (<GameContainer _getExperienceButtonOnPress={(NAVIGATOR_TYPE)=>props.setNav(NAVIGATOR_TYPE)}/>);
}
function leaderBoard(){
    return (<LeaderBoard/>);
}
const styles = StyleSheet.create({
  menuHeader : {
      flex:1,
      justifyContent:'flex-end',
      alignItems:'center',
      backgroundColor: "white",
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
  inner: {
      flex:2,
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "white",
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
});
export default function Menu(props){
    const [navigatorType,setNavigatorType] = useState(UNSET);
    function _getExperienceButtonOnPress(NAVIGATOR_TYPE){
        setNavigatorType(NAVIGATOR_TYPE);
    }
    if(navigatorType==UNSET){ 
      return mainMenu({username:props.username,
        signOut:()=>props.signOut(),
        setNav:(NAVIGATOR_TYPE)=>_getExperienceButtonOnPress(NAVIGATOR_TYPE)});
    }else if(navigatorType==VR_NAVIGATOR_TYPE){
      return playGame({setNav:(NAVIGATOR_TYPE)=>_getExperienceButtonOnPress(NAVIGATOR_TYPE)});
    }else{
      return leaderBoard();
    }
}
