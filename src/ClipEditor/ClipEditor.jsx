import React from 'react';
import ReactDOM from 'react-dom';
import './ClipEditor.css';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();

// Import componenets
import Dropzone from 'react-dropzone';



export default class ClipEditor extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        mediaPath: '',
        text: 'Choose a clipcard',
        }
        this.updateText = this.updateText.bind(this);
        // this.scrubRight = this.scrubRight.bind(this);
        // this.scrubLeft = this.scrubLeft.bind(this);
        this.onDrop = this.onDrop.bind(this);
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

      // scrubRight(e) {
      //   console.log( ReactDOM.findDOMNode(this.refs.container).style)
      //   //document.getElementById('right-scrub').style.right
      // }
      //
      // scrubLeft(e) {
      //   console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.leftScrub)).getPropertyValue("left"))
      //   var container = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.scrubberContainer))
      //   var editorWindow = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.clipEditor))
      //   var leftShift = Number(editorWindow.getPropertyValue("left").split('px')[0]) + Number(container.getPropertyValue("left").split('px')[0]);
      //   var currPos = leftShift + Number(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.leftScrub)).getPropertyValue("left").split('px')[0]);
      //   console.log(currPos, e.clientX)
      // }

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
          </div>
          <textarea
            id="editorText"
            defaultValue={this.state.text}
          >
          </textarea>
        </div>
        <div ref={"scrubberContainer"} id="scrubber-container">
          <div id="scrubber-line"></div>
          <div onClick={this.scrubLeft} ref={"leftScrub"} id="left-scrub"></div>
          <div onClick={this.scrubRight} style={rightScrub} id="right-scrub"></div>
        </div>

      </div>
    )
  }
}
