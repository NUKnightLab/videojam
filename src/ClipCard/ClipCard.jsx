// Add packages
import React from 'react';
import './ClipCard.css';
const osHomedir = require('os-homedir');
var fs = require("fs");
var rand = require("random-key");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();

//Import componenets
import Dropzone from 'react-dropzone';


export default class ClipCard extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
  			clipCard: {
          mediaPath: '',
          text: props.text
        },
        id: ''
  		}
    this.setText = this.setText.bind(this);
    this.setMediaPath = this.setMediaPath.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
	}

  componentDidMount() {
      var id = rand.generate();
      this.setState({
        'id': id,
      })
    }

  updateEditor() {
    this.props.updateEditor(this.props.index);
	}

  componentDidUpdate() {

  }

  setText(event) {
    var clipCard = this.state.clipCard;
    clipCard.text = event.target.value;
    this.setState({
      'clipCard': clipCard,
    });
  }

  setMediaPath(event) {
    var clipCard = this.state.clipCard;
    clipCard.mediaPath = event.target.files[0].path;
    this.setState({
      'clipCard': clipCard,
    });
  }

  render() {
    return (
      <div className="clipCard"
        id = {this.state.id}>
        <textarea
          className="clipText"
          name = "clipText"
          defaultValue = {this.props.text}
          id = {this.state.id}
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
