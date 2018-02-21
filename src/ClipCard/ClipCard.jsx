import React from 'react';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();


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

  render() {
    return (
      <div className="clipCard">
        <input
          type="file"
          id="v1"
          onChange= { this.setMediaPath }
          >
        </input>
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
