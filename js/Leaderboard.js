'use strict';
import React,{useState} from 'react';
import { View, Image, Text } from 'react-native';
import Leaderboard from 'react-native-leaderboard';


export default function LeaderBoard(props){
    const [data,setData] = useState([]);
    const [userRank,setUserRank] = useState(1);
    const [user,setUser] = useState({userName:props.userName,highScore:-1})
    const sort = (data) => {
        const sorted = data && data.sort((item1, item2) => {
            return item2.highScore - item1.highScore;
        })
        let userRank1 = sorted.findIndex((item) => {
            return item.userName === user.userName;
        })
        setUserRank(userRank1+1);
        return sorted;
    }
    function renderHeader() {
        return (
            <View colors={[, '#1da2c6', '#1695b7']}
                style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'white', }}>Leaderboard</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                        {ordinal_suffix_of(userRank)}
                    </Text>
                    <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                        source={{ uri: props.userProfile }} />
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                        {user.highScore}pts
                    </Text>
                </View>
            </View>
        )
    }
    const props_leaderboard = {
        labelBy: 'userName',
        sortBy: 'highScore',
        data:  data,
        icon: 'iconUrl',
        sort: sort
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {renderHeader()}
            <Leaderboard {...props_leaderboard} />
        </View>
    );
}
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