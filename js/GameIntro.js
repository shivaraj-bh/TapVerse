import React from 'react';
import {View,Text,Image,Ion, StyleSheet } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
 
const slides = [
  {
    key: "1",
    title: 'Turn around',
    text: 'To find the objects',
    image: require('./res/app_intro1.gif'),
    backgroundColor: '#59b2ab',
  },
  {
    key: "2",
    title: 'Tap and swipe',
    text: 'To score a point',
    image: require('./res/app_intro2.png'),
    backgroundColor: '#febe29',
  },
];
const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'center',
    },
    titleStyle: {
      padding: 10,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    paragraphStyle: {
      padding: 20,
      textAlign: 'center',
      fontSize: 16,
    },
    introImageStyle: {
      width: 200,
      height: 200,
    },
    introTextStyle: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      paddingVertical: 30,
    },
    introTitleStyle: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      marginBottom: 16,
      fontWeight: 'bold',
    },
});
export default function GameIntro(props){
  const onDone = () => {
    props.startGame();
  };
  const onSkip = () => {
    props.startGame();
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          source={item.image} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      showSkipButton={true}
      onSkip = {onSkip}
      onDone={onDone}
    />
  );
}