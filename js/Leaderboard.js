'use strict';
import React,{useState} from 'react';
import Leaderboard from 'react-native-leaderboard';
export default function LeaderBoard(props){
    const [data,setData] = useState([{userName:'Joe',highScore:52},
                             {userName:'Josh',highScore:100}]);
    return (
        <Leaderboard
            data={data}
            sortBy='highScore'
            labelBy='userName'
        />
    );
}