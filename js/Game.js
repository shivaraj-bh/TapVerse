'use strict';

import React, { Component } from 'react';
import {
  ViroARScene,
  ViroScene,
  ViroMaterials,
  ViroAmbientLight,
  ViroAnimations,
  ViroSphere
} from 'react-viro';
class Sphere extends Component{
  constructor(props){
    super(props);
    this.anims = {defaultAnim:{},leaveAnim:{}};
    this.anims.defaultAnim.name = "animateImage";
    this.anims.defaultAnim.run = true;
    this.anims.defaultAnim.loop = true;
    this.anims.leaveAnim.name = "exitAnim";
    this.anims.leaveAnim.run = true;
    this.anims.leaveAnim.onFinish = ()=> {this.setState({anim:this.anims.defaultAnim});
                                          console.log("Animation finished");}
    this.state = {anim:this.anims.defaultAnim};
  }
  randomSign(){
    let sign = Math.floor(Math.random()*2);
    return sign;
  }
  generateRandom(){
    let sign = this.randomSign();
    if(sign==0)return Math.random();
    return -Math.random();
  }
  render(){
    return(
      <ViroSphere
        position={[this.generateRandom(),this.generateRandom(),-0.7]}
        scale={[0.15,0.15,0.15]}
        materials={["ball"]}
        animation={this.state.anim}
        onClick={()=>{this.setState({anim:this.anims.leaveAnim});
                      console.log("Yeaaaaa");}}
        
      />
    );
  }
}
export default class Game extends Component {
  constructor() {
    super();
  }
  generateSpheres(n){
    return [...Array(n)].map((x,i)=>
        <Sphere key={i}/>
        );
  }
  render() {
    console.log("Rendering");
    return (
      <ViroScene>
        <ViroAmbientLight color={"#fff"}/>
            {this.generateSpheres(2)}
      </ViroScene>
    );
  }

}
ViroMaterials.createMaterials({
  ball: {
    diffuseTexture:require('./res/grid_bg.jpg'),
    bloomThreshold:0.0,
    metalness:1.0,
    roughness:0,
    lightingModel: 'PBR',
  }
});
ViroAnimations.registerAnimations({
  animateImage:{properties:{rotateZ:"+=10",rotateX:"+=60",rotateY:"+=30"}, 
  duration: 200},
  exitAnim: {
    properties:{scaleX:"-=0.05",scaleY:"-=0.05",scaleZ:"-=0.005"},
    duration:100
  }
});
module.exports = Game;
