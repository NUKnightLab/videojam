import React from 'react';
import ReactDOM from 'react-dom';
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
        leftScrubPos: 0,
        rightScrubPos: 0,
        videoStartTime : 0,

        }
        this.updateText = this.updateText.bind(this);
        this.scrubRight = this.scrubRight.bind(this);
        this.scrubLeft = this.scrubLeft.bind(this);
        this.setLeftScrubPos = this.setLeftScrubPos.bind(this);
        this.setRightScrubPos = this.setRightScrubPos.bind(this);
        this.pausePlay = this.pausePlay.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
  		}

      componentDidMount() {

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

      scrubRight(e) {
        if (document.getElementById('editorVideo').src.split("file://")[1] == this.state.mediaPath) {
          var container = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.scrubberContainer));
          var editorWindow = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.clipEditor));
          var leftShift = Number(editorWindow.getPropertyValue("left").split('px')[0]) + Number(container.getPropertyValue("left").split('px')[0])
          var rightShift = leftShift + Number(container.getPropertyValue("width").split('px')[0]);
          var rightScrubberPos = Number(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.rightScrub)).getPropertyValue("right").split('px')[0]);
          var currPos = rightShift + rightScrubberPos;
          var mousePos = window.pageXOffset + e.clientX
          if ((mousePos < rightShift) & (mousePos > leftShift & mousePos > this.state.leftScrubPos)) {
            //console.log("aye whats going on", rightShift-mousePos)
            ReactDOM.findDOMNode(this.refs.rightScrub).style.right = String(rightShift-mousePos) + "px";
          }
        }
      }

      setRightScrubPos() {
        var container = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.scrubberContainer));
        var editorWindow = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.clipEditor));
        var leftShift = Number(editorWindow.getPropertyValue("left").split('px')[0]) + Number(container.getPropertyValue("left").split('px')[0]);
        var rightShift = leftShift + Number(container.getPropertyValue("width").split('px')[0]);
        var rightScrubberPos = Number(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.rightScrub)).getPropertyValue("right").split('px')[0]);
        var currPos = rightShift - rightScrubberPos;

        var newEndTime = (Number(container.getPropertyValue("width").split('px')[0]) - rightScrubberPos)/Number(container.getPropertyValue("width").split('px')[0]);
        var videoLength = document.getElementById('editorVideo').duration;
        newEndTime = newEndTime * videoLength;
        console.log(newEndTime);

        document.getElementById('editorVideo').currentTime = this.state.videoStartTime;

        this.setState({
          'rightScrubPos' : currPos,
          'endTime' : newEndTime,
        });
      }

      scrubLeft(e) {
        if (document.getElementById('editorVideo').src.split("file://")[1] == this.state.mediaPath) {
          var container = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.scrubberContainer));
          var editorWindow = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.clipEditor));
          //console.log("ayo is this px or %", editorWindow.getPropertyValue("left").split('px')[0])
          var leftShift = Number(editorWindow.getPropertyValue("left").split('px')[0]) + Number(container.getPropertyValue("left").split('px')[0]);
          var rightShift = leftShift + Number(container.getPropertyValue("width").split('px')[0]);
          var leftScrubberPos = Number(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.leftScrub)).getPropertyValue("left").split('px')[0]);
          var currPos = leftShift + leftScrubberPos;
          var mousePos = window.pageXOffset + e.clientX
          var stateRightPos = this.state.rightScrubPos;
          if (stateRightPos == 0) {
            stateRightPos = rightShift
          }
          //console.log(currPos, window.pageXOffset + e.clientX, leftShift, leftScrubberPos)
          if (mousePos > leftShift & (mousePos < rightShift & mousePos < stateRightPos)) { //GET STATE.RIGHTSCRUBPOS TO NOT BE 0 INITIALLY!
            ReactDOM.findDOMNode(this.refs.leftScrub).style.left = String(mousePos-leftShift) + "px";
          }
        }
      }

      setLeftScrubPos() {
        var container = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.scrubberContainer));
        var editorWindow = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.clipEditor));
        var leftShift = Number(editorWindow.getPropertyValue("left").split('px')[0]) + Number(container.getPropertyValue("left").split('px')[0]);
        var leftScrubberPos = Number(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.leftScrub)).getPropertyValue("left").split('px')[0]);

        var newStartTime = leftScrubberPos/Number(container.getPropertyValue("width").split('px')[0])
        var videoLength = document.getElementById('editorVideo').duration
        newStartTime = newStartTime * videoLength;
        document.getElementById('editorVideo').currentTime = newStartTime
        var currPos = leftShift + leftScrubberPos;
        this.setState({
          'leftScrubPos' : currPos,
          'videoStartTime' : newStartTime,
        });
      }

      pausePlay() {
        if (document.getElementById('editorVideo').src.split("file://")[1] == this.state.mediaPath) {
          var button = document.getElementById('play-pause-button')
          var video = document.getElementById('editorVideo')
          if (button.innerHTML == "►") {
            button.innerHTML = "&#10074;&#10074;"
            console.log()
            if (video.currentTime == video.duration || video.currentTime == 0 || video.currentTime >= (this.state.endTime - 0.15)) {
              video.currentTime = this.state.videoStartTime;
            }
            video.play();
          }
          else {
            button.innerHTML = "&#9658;"
            video.pause();
          }
        }
      }

      videoDone() {
        document.getElementById('play-pause-button').innerHTML = "&#9658;"
      }

      pauseVideo() {
        var video = document.getElementById('editorVideo')
        console.log(video.currentTime, this.state.endTime, video.currentTime <= (this.state.endTime + 0.2) & video.currentTime >= (this.state.endTime - 0.2))
        if (video.currentTime >= (this.state.endTime - 0.05)) {
          video.pause()
        }
      }

  render() {
    return (
      <div ref={"clipEditor"} className="clipEditor">
        <div id="clipEdit-container">
          <div>
            <video id="editorVideo" width="440" onTimeUpdate={this.pauseVideo} onPause={this.videoDone} height="360" src={this.state.mediaPath} controls></video>
          </div>
          <textarea
            id="editorText"
            defaultValue={this.state.text}
          >
          </textarea>
        </div>
        <div ref={"scrubberContainer"} id="scrubber-container">
          <div id="scrubber-line"></div>
          <p id="play-pause-button" onClick={this.pausePlay}> &#9658; </p>
          <div onDrag={this.scrubLeft} onDragEnd={this.setLeftScrubPos} ref={"leftScrub"} id="left-scrub" draggable></div>
          <div onDrag={this.scrubRight} onDragEnd={this.setRightScrubPos} ref={"rightScrub"} id="right-scrub" draggable></div>
        </div>

      </div>
    )
  }
}
