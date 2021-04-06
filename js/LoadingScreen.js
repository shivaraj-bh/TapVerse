import React from 'react';
import {View,Text,StatusBar,StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
export default function LoadScreen(){
    return(
      <>
        <StatusBar barStyle="dark-content" showHideTransition="slide" hidden={true} />
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>
              TapVerse
            </Text>
            <Text style={styles.sectionDescription}>
                Loading...
              </Text>
          </View>
      </>);
  }