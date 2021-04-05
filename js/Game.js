'use strict';
import React, { Component,useState } from 'react';
import {
  ViroScene,
  ViroMaterials,
  ViroAmbientLight,
  ViroSphere,
  ViroSkyBox,
  ViroNode,
  ViroSound,
} from 'react-viro';
function Sphere(props){
  const [refresh,setRefresh] = useState(true);
  return(
    <ViroNode>
      <ViroSphere
        position={props.random(0,0,0,5)}
        scale={[0.2,0.2,0.2]}
        materials={["ball"]}
        onFuse={{callback:()=>{setRefresh(!refresh);props.onFuse();},timeToFuse:0}}/>
      
    </ViroNode>
  );
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  shouldComponentUpdate(nextProps) {
    // Rendering the component only if 
    // passed props value is changed
    if (nextProps.value !== this.props.value) {
      return true;
    } else {
      return false;
    }
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
  generateSpheres(n){
    return [...Array(n)].map((_x,i)=>
        <Sphere key={i} random={(x,y,z,r)=>{return this.randomSpherePoint(x,y,z,r);}} onFuse={()=>this.props.sceneNavigator.viroAppProps.onFuse()}/>
        );
  }
  render() {
    return (
      <ViroScene>
        <ViroSkyBox source={{nx:require('./res/grid_bg.jpg'),
                             px:require('./res/grid_bg.jpg'),
                             ny:require('./res/grid_bg.jpg'),
                             py:require('./res/grid_bg.jpg'),
                             nz:require('./res/grid_bg.jpg'),
                             pz:require('./res/grid_bg.jpg')}}/>
        <ViroAmbientLight color={"#fff"} intensity={900}/>
        {this.generateSpheres(20)}
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
