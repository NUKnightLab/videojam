/*import React from 'react';
const osHomedir = require('os-homedir');

var fluent_ffmpeg = require("fluent-ffmpeg");
var ffmpegPath  = require("../../config.js").ffmpegPath;
var ffprobePath = require("../../config.js").ffprobePath;
fluent_ffmpeg.setFfmpegPath(osHomedir() + '/desktop/projects/videojam/node_modules/ffmpeg-static' + ffmpegPath);
fluent_ffmpeg.setFfprobePath(osHomedir() + '/desktop/projects/videojam/node_modules/ffprobe-static' + ffprobePath);
// Import libraries
var fs = require("fs");
var tmp = require('tmp');
var tmpobj = tmp.dirSync({unsafeCleanup: true});

export default class ClipCard extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        //key: props.key,
        //clipCard: []
  			clipCard: {
          mediaPath: '',
          text: props.text
        }
  		}
    this.setText = this.setText.bind(this);
	}

  componentWillMount() {
    console.log(this.props.cardId);
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
    var outStream = fs.createWriteStream('./clips/'+this.props.cardId+'.mov');
    fluent_ffmpeg(event.target.files[0].path).save(outStream);
    clipCard.mediaPath = event.target.files[0].path;
    this.setState({
      'clipCard': clipCard,
    });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          id="v1"
          onChange= { this.setMediaPath.bind(this) }
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
}*/

import React from 'react';
const osHomedir = require('os-homedir');
var fs = require("file-system");
var tmp = require('tmp');
var tmpobj = tmp.dirSync({unsafeCleanup: true});
// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var ffmpegPath  = require("./../../config.js").ffmpegPath;
var ffprobePath = require("./../../config.js").ffprobePath;
fluent_ffmpeg.setFfmpegPath(osHomedir() + '/desktop/Projects/videojam/node_modules/ffmpeg-static' + ffmpegPath);
fluent_ffmpeg.setFfprobePath(osHomedir() + '/desktop/Projects/videojam/node_modules/ffprobe-static' + ffprobePath);
var mergedVideo = fluent_ffmpeg();
export default class ClipCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
        //clipCard: []
            clipCard: {
          mediaPath: '',
          text: ''
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
    console.log("temp folder: " + this.props.videoStorage);
    fs.copyFileSync(event.target.files[0].path, this.props.videoStorage+'/'+this.props.cardId+'.mov')

  }
  render() {
    return (
      <div>
        <input
          type="file"
          id="v1"
          onChange= { this.setMediaPath }
          >
        </input>
        <textarea
          name = "clipText"
          defaultValue = "fill me in"
          onChange = { this.setText }
          >
        </textarea>
      </div>
    )
  }
}
