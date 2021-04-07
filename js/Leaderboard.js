'use strict';
import React,{useEffect, useState} from 'react';
import { View, Image, Text,StyleSheet,TouchableHighlight} from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import firestore from '@react-native-firebase/firestore';
var UNSET = "UNSET";
var count = 0;
export default function LeaderBoard(props){
    count+=1;
    console.log("Re-rendered",count);
    let isSubscriber = true;
    const [data,setData] = useState([]);
    const [user,setUser] = useState({userName:props.userName,
        highScore:-1,
        iconURL:"https://i.imgur.com/gg8LwxU.jpg",
        userRank:1
    })
    useEffect(()=>{
        firestore()
            .collection('users')
            .doc(props.uid)
            .get()
            .then(doc=>{
                console.log("some data",doc.data());
                firestore()
                    .collection('scores')
                    .doc('reversedIndex')
                    .get()
                    .then(doc1=>{
                        console.log("some other data",doc1.data());
                        let reversedIndex = [...doc1.data().array];
                        const userScore = doc.data().highScore;
                        const userRank = reversedIndex.slice(userScore+1,200).reduce((a,b)=>a+b,0)+1;
                        let iconUrl = doc.data().iconURL;
                        if(iconUrl==null){
                            iconUrl = "https://i.imgur.com/gg8LwxU.jpg";
                        }
                        const userData = {userName:doc.data().userName,
                            highScore:doc.data().highScore,
                            iconURL:iconUrl,
                            userRank:userRank,
                        };
                        if(JSON.stringify(user)!=JSON.stringify(userData))
                            setUser(userData);
                    });
            });
        const data_collect = setTimeout(()=>firestore()
            .collection('users')
            .orderBy('highScore',"desc")
            .onSnapshot(docSnap=>{
                if(docSnap===null||(!isSubscriber))return;
                const data_retrieve = [];
                docSnap.forEach((doc)=>{
                    let iconUrl = doc.data().iconURL;
                    if(iconUrl==null){
                        iconUrl = "https://i.imgur.com/gg8LwxU.jpg";
                    }
                    data_retrieve.push({userName:doc.data().userName,
                            highScore:doc.data().highScore,
                            iconURL:iconUrl});
                });
                if(JSON.stringify(data)!=JSON.stringify(data_retrieve))
                    setData(data_retrieve);
            }),100);
        return ()=>{isSubscriber=false;clearTimeout(data_collect)};
    },[data]);
    function renderHeader() {
        return (
            <View
                style={{backgroundColor: 'black', padding: 15, paddingTop: 65, alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'white',fontWeight:'400' }}>Leaderboard</Text>
                <TouchableHighlight style={styles.exitButton}
                    onPress={()=>props.setNav(UNSET)}
                    underlayColor={'#68a0ff'}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableHighlight>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40,fontWeight:'400' }}>
                        {ordinal_suffix_of(user.userRank)}
                    </Text>
                    <Image style={{ flex: 0.5, height: 60, width: 60, borderRadius: 30,borderWidth:2,borderColor:'white' }}
                        source={{ uri: user.iconURL}} />
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40,fontWeight:'400'}}>
                        {user.highScore} pts
                    </Text>
                </View>
            </View>
        )
    }
    const props_leaderboard = {
        labelBy: 'userName',
        sortBy: 'highScore',
        data:  data,
        icon: 'iconURL',
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {renderHeader()}
            <Leaderboard {...props_leaderboard} />
        </View>
    );
}
const styles = StyleSheet.create({
    exitButton : {
        position:'absolute',
        margin:10,
        right:0,
        height: 45,
        width: 90,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '400',
        color: "white",
    },
});
const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}