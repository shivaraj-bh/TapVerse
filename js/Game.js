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
  //Source: https://stackoverflow.com/a/15048260
  randomSpherePoint(x0,y0,z0,radius){
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
    var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
    var z = z0 + (radius * Math.cos(phi));
    return [x,y,z];
 }
  render(){
    return(
      <ViroSphere
        position={this.randomSpherePoint(0,0,0,1)}
        scale={[0.25,0.25,0.25]}
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
      <ViroARScene>
        <ViroAmbientLight color={"#fff"}/>
            {this.generateSpheres(10)}
      </ViroARScene>
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
  duration: 400},
  exitAnim: {
    properties:{scaleX:"-=0.25",scaleY:"-=0.25",scaleZ:"-=0.25"},
    duration:100
  }
});
module.exports = Game;
