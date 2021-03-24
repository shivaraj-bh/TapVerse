'use strict';

import React, { Component } from 'react';
import {
  ViroARScene,
  ViroScene,
  ViroMaterials,
  ViroAmbientLight,
  ViroAnimations,
  ViroSphere,
  Viro360Image,
  ViroSkyBox,
  ViroSpotLight,
  ViroController,
  ViroNode,
  ViroSound
} from 'react-viro';
class Sphere extends Component{
  constructor(props){
    super(props);
    this.state = {isPaused:true};
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
  _LeaveAnim(){
    this.setState({isPaused:false});
  }
  render(){
    return(
      <ViroNode>
        <ViroSphere
          position={this.randomSpherePoint(0,0,0,5)}
          scale={[0.2,0.2,0.2]}
          materials={["ball"]}
          onFuse={{callback:()=>{this._LeaveAnim()},timeToFuse:0}}/>
        <ViroSound
          source={require('./res/game.wav')}
          loop={true}
          paused={this.state.isPaused}
          onFinish={()=>{this.setState({isPaused:true});}}/>
      </ViroNode>
    );
  }
}
export default class Game extends Component {
  constructor() {
    super();
  }
  generateSpheres(n){
    return [...Array(n)].map((_x,i)=>
        <Sphere key={i}/>
        );
  }
  render() {
    console.log("Rendering");
    return (
      <ViroScene>
        <ViroSkyBox source={{nx:require('./res/grid_bg.jpg'),
                       px:require('./res/grid_bg.jpg'),
                       ny:require('./res/grid_bg.jpg'),
                       py:require('./res/grid_bg.jpg'),
                       nz:require('./res/grid_bg.jpg'),
                       pz:require('./res/grid_bg.jpg')}} />
        <ViroAmbientLight color={"#fff"} intensity={900}/>
        {this.generateSpheres(10)}
      </ViroScene>
    );
  }
}
ViroMaterials.createMaterials({
  ball: {
    diffuseTexture:require('./res/grid_bg1.png'),
    bloomThreshold:0.0,
    metalness:1.0,
    roughness:0,
    lightingModel: 'PBR',
  }
});
module.exports = Game;
