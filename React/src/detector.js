import React, { useState, Component  } from "react";
import ReactDOM from 'react-dom/client';
import * as poseDetection from '@tensorflow-models/pose-detection';
import './detector.css';



class Detector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  async detect(){
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER});
      const image = document.getElementById('image');
      const poses = await detector.estimatePoses(image);
      console.log('Output:\n');
      console.log(poses[0].keypoints);
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <img id="image" src={this.state.image} />
            <h1>Select Image: </h1>
            <input className = "imageUpload" type="file" name="myImage" onChange={this.onImageChange} />
            <br/> 
            <button className = "showPose" onClick={this.detect}>Show pose</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Detector;


