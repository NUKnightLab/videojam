// Import modules
import React from 'react';
// import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

// Import styles
import './ClipEditor.css';


export default class ClipEditor extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        text: 'Choose a clipcard from below',
        leftScrubPos: 0,
        rightScrubPos: 0,
        videoStartTime : 0,
        mediaPath: '',
        // text: props.text,
        text: '',
        id: ''
      },
      this.updateText = this.updateText.bind(this);
      this.updateMedia = this.updateMedia.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.updateCard = this.updateCard.bind(this);
      this.scrubRight = this.scrubRight.bind(this);
      this.scrubLeft = this.scrubLeft.bind(this);
      this.setLeftScrubPos = this.setLeftScrubPos.bind(this);
      this.setRightScrubPos = this.setRightScrubPos.bind(this);
      this.pausePlay = this.pausePlay.bind(this);
      this.pauseVideo = this.pauseVideo.bind(this);
    }

      componentDidMount() {

      }

      updateText(event) {
        var clipCard = this.state.clipCard;
        clipCard.text = event.target.value;
        clipCard.id = document.getElementById("editorText").cardkey;
        this.setState({
          'clipCard': clipCard,
        });

        var cardContainer = this.props.cardContainer;
        // var editorText = document.getElementById("editorText")
        for (var i = 0; i < cardContainer.length; i++) {
          if (cardContainer[i].id == clipCard.id) {
            cardContainer[i] = clipCard;
            this.props.updateCardContainer(cardContainer);
            console.log(cardContainer)
            console.log(cardContainer[i])
          }
        }
      }

      updateMedia(event) {
        var clipCard = this.state.clipCard;
        clipCard.mediaPath = document.getElementById("editorVideo").src;
        this.setState({
          'clipCard': clipCard,
        });

        var cardContainer = this.props.cardContainer;
        // var editorText = document.getElementById("editorText")
        for (var i = 0; i < cardContainer.length; i++) {
          if (cardContainer[i].id == clipCard.id) {
            cardContainer[i] = clipCard;
            this.props.updateCardContainer(cardContainer);
            console.log(cardContainer)
            console.log(cardContainer[i])
          }
        }
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

      // on editor window button click, updates the selected card's text/media
      updateCard(event) {
        // Grab editor window textarea element
        var editorText = document.getElementById("editorText");
        // Grab editor window video element
        var editorVideo = document.getElementById("editorVideo");
        // grab selected card's index
        var currCardIndex = editorText.cardindex;

        // grab array from app.js which holds each clipcard's info
        var cardContainer = this.props.cardContainer;
        // get selected clipcard's info
        var currCardInfo = cardContainer[currCardIndex]
        console.log("current card state: ", currCardInfo)
        // get the current card's text and video values
        var currCardText = document.getElementById(currCardInfo['id']).children[0].children[1]
        var currCardMedia = document.getElementById(currCardInfo['id']).children[2];
        // update the card's text value to be the editor window's text's value
        currCardText.value = editorText.value
        // update the card's video source to be the editor window's video source
        currCardMedia.src = editorVideo.src

        var clipCard = this.state.clipCard;
        clipCard.mediaPath = currCardMedia.src;
        clipCard.text = currCardText.value
        this.setState({
          'clipCard': clipCard,
        });

        console.log("card container: ", cardContainer)
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
            if (video.currentTime == video.duration || video.currentTime == 0 || (video.currentTime <= (this.state.endTime + 0.15) & video.currentTime >= (this.state.endTime - 0.15))) {
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
        if (video.currentTime <= (this.state.endTime + 0.15) & video.currentTime >= (this.state.endTime - 0.15)) {
          video.pause()
        }
      }

      onDrop(files) {
        // console.log('dropzone ', files[0].path)
        var clipCard = this.state.clipCard;
        clipCard.mediaPath = files[0].path;
        // clipCard.id = document.getElementById("editorText").cardkey;
        // clipCard.text = document.getElementById("editorText").value;
        this.setState({
          'clipCard': clipCard,
        });

        var cardContainer = this.props.cardContainer;
        for (var i = 0; i < cardContainer.length; i++) {
          if (cardContainer[i].id == clipCard.id) {
            cardContainer[i] = clipCard;
            this.props.updateCardContainer(cardContainer);
            console.log(cardContainer)
            console.log("card i: ", cardContainer[i])
          }
        }

        // var video = document.getElementById("video-input" + this.props.index);
        var video = document.getElementById("editorVideo");
        video.src = files[0].path;
        document.getElementById("placeholder").style.display="none";

      }

    render() {
      return (
      <div>
        <div ref={"clipEditor"} className="clipEditor">
          <p className="clip-instruction">Add/edit text and video for the selected card. Press "Update Card" when you're done!</p>
            <div className="videotextcontainer">
              <div className="dropzone">
                <Dropzone className="dropzone-styles" onDrop={this.onDrop.bind(this)}>
                  <img
                    id="placeholder"
                    src="./placehold.png">
                  </img>
                  <video
                    id="editorVideo"
                    width="440"
                    height="360"
                    onTimeUpdate={this.pauseVideo}
                    onPause={this.videoDone}
                    src={this.state.mediaPath}
                    controls
                    onChange={this.updateMedia}
                    cardkey=''
                    cardindex=''>
                  </video>
                </Dropzone>
            </div>
            <div id="buttonalign">
              <textarea
                id="editorText"
                defaultValue={this.state.text}
                onChange={this.updateText}
                cardkey=''
                cardindex=''
              >
              </textarea>
              <button
                id="updatebtn"
                className="button-dark"
                onClick={this.updateCard}
              >
                Update card!
              </button>
          </div>
          </div>
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

// id={"video-input" + this.props.index}


// <video
//   id="editorVideo"
//   id={"video-input" + this.props.index}
//   width="440"
//   height="360"
//   src={this.state.mediaPath}
//   controls
//   onChange={this.passMedia}>
// </video>
