// Add packages
import React from 'react';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();

//Import componenets
import Dropzone from 'react-dropzone';


export default class ClipCard extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        //clipCard: []
  			clipCard: {
          mediaPath: '',
          text: props.text
        }
  		}
    this.setText = this.setText.bind(this);
    this.setMediaPath = this.setMediaPath.bind(this);
    this.onDrop = this.onDrop.bind(this);
    // this.dragDrop = this.dragDrop.bind(this);

	}

  componentDidUpdate() {
    console.log(this.state.clipCard);
  }

  setText(event) {
    var clipCard = this.state.clipCard;
    clipCard.text = event.target.value;
    this.setState({
      'clipCard': clipCard,
      // 'clipCard.text': event.target.value,
    });
  }

  setMediaPath(event) {
    var clipCard = this.state.clipCard;
    clipCard.mediaPath = event.target.files[0].path;
    this.setState({
      'clipCard': clipCard,
      // 'clipCard.mediaPath': event.target.files[0].path,
    });
  }

  // dragDrop(e) {
  // 		e.preventDefault();
  // 		var data = e.dataTransfer.getData('text');
  // 		console.log('dragdrop',data);
  // 		this.setState({ videoPath: e.dataTransfer.getData('text') });
  // 		var videoObjects = this.props.videoObjects;
  // 		var position = this.props.position;
  // 		videoObjects[position].video_path = data;
  // 		this.props.updateVideoObjects[videoObjects];
  // 	}
  onDrop(files) {
    console.log('dropzone ', files[0].path)
    var clipCard = this.state.clipCard;
    clipCard.mediaPath = files[0].path;
    this.setState({
      'clipCard': clipCard,
    });
    var video = document.getElementById("video-input")
    video.src = files[0].path
  }

  render() {
    return (
      <div className="clipCard">
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Drop or click to add a video.</p>
            <video
              id="video-input"
              controls='true'>
            </video>
          </Dropzone>
        </div>
        <textarea
          name = "clipText"
          defaultValue = {this.props.text}
          onChange = { this.setText }
          >
        </textarea>
      </div>
    )
  }
}

// <div className="dropzone">
//   <Dropzone onDrop={this.onDrop.bind(this)}>
//     <p>Try dropping some files here, or click to select files to upload.</p>
//   </Dropzone>
// </div>


// <div
//   className='dropzone'
//   onDrop={this.dragDrop}>
//         <video
//           className='video-clip'
//           controls='true'
//           src={ this.state.mediaPath }>
//         </video>
// </div>

//
// <input
//   type="file"
//   id="v1"
//   onChange= { this.setMediaPath }
//   >
// </input>
