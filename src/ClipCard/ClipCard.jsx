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
    var outStream = fs.createWriteStream('./clips/'+Math.random().toString()+'.mov');
    fluent_ffmpeg(clipCard.mediaPath)
      .size('1200x?')
      .aspect('1:1')
      .autopad()
      .toFormat('mov')
      .duration(5.0)
      .videoCodec('libx264')
      .noAudio()
      //frag_keyframe allows fragmented output & empty_moov will cause
      //output to be 100% fragmented; without this the first fragment
      //will be muxed as a short movie (using moov) followed by the
      //rest of the media in fragments.
      .outputOptions('-movflags frag_keyframe+empty_moov')
      .outputOptions('-strict -2')
      // .output(outStream)
      // .run()
      // .pipe(outStream, { end: true })
      // .saveToFile(outStream)
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })
      .on('end', function() {
        console.log('Processing finished !')
      })
      // .pipe(outStream, { end: true })
      .save(outStream)
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
