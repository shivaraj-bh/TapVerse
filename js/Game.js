'use strict';

import React, { Component } from 'react';
import {
  ViroARScene,
  ViroMaterials,
  ViroAmbientLight,
  ViroAnimations,
  ViroSphere
} from 'react-viro';
export default class Game extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ViroARScene>
        <ViroAmbientLight color={"#fff"}/>
            <ViroSphere
              position={[0,-0.5,-0.7]}
              scale={[0.15,0.15,0.15]}
              materials={["ball"]}
              animation={{name:"animateImage",run:true,loop:true}}
            />
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
  duration: 200},
});
module.exports = Game;
