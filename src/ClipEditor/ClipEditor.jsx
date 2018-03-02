import React from 'react';
import './ClipEditor.css';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();


export default class ClipEditor extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        mediaPath: '',
        text: 'Choose a clipcard',
        }
        this.updateText = this.updateText.bind(this);
  		}

      componentDidUpdate() {
        if (!isNaN(this.props.editorEndpoints)) {
          var selected = document.getElementsByClassName('clipCard')[this.props.editorEndpoints].children;
          if ((this.state.mediaPath != (selected[0].children[0].children[2].files.length > 0 ? selected[0].children[0].children[2].files[0].path : '')) | this.state.text != selected[1].value ) {
            console.log(this.state.text)
            this.setState({

              'mediaPath' : selected[0].children[0].children[2].files.length > 0 ? selected[0].children[0].children[2].files[0].path : '',
              'text' : selected[1].value,
            })
            document.getElementById("editorText").value = selected[1].value;
          }
        }
      }

      updateText() {
      }

  render() {
    return (
      <div className="clipEditor">
        <div>
          <video id="editorVideo" width="440" height="360" src={this.state.mediaPath} controls></video>
        </div>
        <textarea
          id="editorText"
          defaultValue={this.state.text}
        >
        </textarea>

      </div>
    )
  }
}
