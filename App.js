import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  ViroVRSceneNavigator
} from 'react-viro';
import CountDown from 'react-native-countdown-component';
var InitialVRScene = require('./js/Game');
var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var defaultNavigatorType = UNSET;

const ScoreText = (props)=>{
  const [score,setScore] = useState(0);
  useEffect(()=>{
    setScore(score+1);
  },[props.score]);
  return(
    <Text style={localStyles.titleText}>
      {score}
    </Text>
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
      return this._getExperienceSelector();
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
            <Text style={localStyles.titleText}>
              {this.state.score}
            </Text>
          </View>
      </View>);
      }
    }
  
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>VR</Text>
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
  titleText: {
    position:'absolute',
    left:20,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin"
  },
  timer:{
    position: 'absolute',
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
