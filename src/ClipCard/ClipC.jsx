// Add packages
import React from 'react';
import './ClipCard.css';
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
  			clipCard: {
          mediaPath: '',
          text: props.text
        }
  		}
      this.setText = this.setText.bind(this);
      this.setMediaPath = this.setMediaPath.bind(this);
      this.updateEditor = this.updateEditor.bind(this);
      this.onDrop = this.onDrop.bind(this);
      // this.dragDrop = this.dragDrop.bind(this);
  	}

    updateEditor() {
      this.props.updateEditor(this.props.index);
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
      // clipCard.mediaPath = event.target.files[0].path;
      // this.setState({
      //   'clipCard': clipCard,
      // });
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
      document.getElementsByClassName("clip-instruction")[this.props.index].style.display = "none";
      var clipCard = this.state.clipCard;
      clipCard.mediaPath = files[0].path;
      this.setState({
        'clipCard': clipCard,
      });
      var video = document.getElementById("video-input" + this.props.index)
      video.src = files[0].path
    }

    render() {
      return (
        <div className="clipCard" onClick={this.updateEditor}>
          <textarea
            className="clipText"
            name = "clipText"
            defaultValue = {this.props.text}
            onChange = {this.setText}
            >
          </textarea>
        </div>
      )
    }
}
