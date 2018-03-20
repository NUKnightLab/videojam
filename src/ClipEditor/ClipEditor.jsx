import React from 'react';
import ReactDOM from 'react-dom';
import './ClipEditor.css';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();

// Import components
import Dropzone from 'react-dropzone';


export default class ClipEditor extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        mediaPath: '',
        text: 'Choose a clipcard',
        clipCard: {
          mediaPath: '',
          text: props.text
        },
        cardKey: '',
      }
      // this.updateText = this.updateText.bind(this);
      // this.scrubRight = this.scrubRight.bind(this);
      // this.scrubLeft = this.scrubLeft.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.updateText = this.updateText.bind(this);
		}

      updateText() {
        var selected = document.getElementsByClassName('clipCard');
        var clipCard = this.state.clipCard;
        var editorText = document.getElementById("editorText");

        clipCard.text = document.getElementById("editorText").value
        this.setState({
          'clipCard': clipCard,
        });
        console.log(this.state.clipCard);

        var id = editorText.cardkey
        console.log(document.getElementById(id).value)

        document.getElementById(id).value = editorText.value;
      }

      onDrop(files) {
        console.log('dropzone ', files[0].path)
        // document.getElementsByClassName("clip-instruction")[this.props.index].style.display = "none";
        var clipCard = this.state.clipCard;
        clipCard.mediaPath = files[0].path;
        this.setState({
          'clipCard': clipCard,
        });
        console.log(clipCard)
        var video = document.getElementById("video-input" + this.props.index)
        video.src = files[0].path
        document.getElementById("placeholder").style.display="none";
      }

  render() {
    const rightScrub = {right: '1%'}
    return (
    <div>
      <div ref={"clipEditor"} className="clipEditor">
        <div className="videotextcontainer">
          <div className="dropzone">
            <Dropzone className="dropzone-styles" onDrop={this.onDrop.bind(this)}>
              <p className="clip-instruction">Drop or click to add a video.</p>
              <img
                id="placeholder"
                src="./placehold.png">
              </img>
              <video
                id="editorVideo"
                id={"video-input" + this.props.index}
                width="440"
                height="360"
                src={this.state.mediaPath}
                controls>
              </video>
            </Dropzone>
        </div>
        <textarea
          id="editorText"
          cardkey=''
          defaultValue={this.state.text}
          onChange={this.updateText}
        >
        </textarea>
      </div>
    </div>
  </div>
  )
}
}

/*
<div ref={"scrubberContainer"} id="scrubber-container">
  <div id="scrubber-line"></div>
  <div onClick={this.scrubLeft} ref={"leftScrub"} id="left-scrub"></div>
  <div onClick={this.scrubRight} style={rightScrub} id="right-scrub"></div>
</div>
*/
