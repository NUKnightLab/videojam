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
          text: props.text,
          id: ''
        },
        id: '',
  		}
    this.setText = this.setText.bind(this);
    this.placeText = this.placeText.bind(this);
    // this.setMediaPath = this.setMediaPath.bind(this);
    // this.passUp = this.passUp.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
    // this.updateCardContainer = this.updateCardContainer.bind(this);
	}

  componentDidMount() {
      // creates a unique ID string for each clip card
      var id = rand.generate();
      this.setState({
        'id': id,
      });

      // adds the id to the clip card object
      var clipCard = this.state.clipCard;
      clipCard.id = id;
      this.setState({
        'clipCard': clipCard,
      });

      // adds clip card to app.js card container array
      var cardContainer = this.props.cardContainer;
      for (var i = 0; i < cardContainer.length; i++) {
        if (cardContainer[i].id == clipCard.id) {
          break;
        }
      }
      cardContainer.push(clipCard);
      this.props.updateCardContainer(cardContainer);
    }

  updateEditor() {
    this.props.updateEditor(this.props.index);
	}

  // updateCardContainer() {
  //   this.props.updateCardContainer(this.state.clipCard)
  // }

  placeText(event) {
    var editorText = document.getElementById("editorText");
    var clipCard = this.state.clipCard;
    editorText.value = clipCard.text;
    editorText.cardkey = this.state.id;
  }

  setText(event) {
    var clipCard = this.state.clipCard;
    var cardContainer = this.props.cardContainer;
    for (var i = 0; i < cardContainer.length; i++) {
      if (cardContainer[i].id == clipCard.id) {
        clipCard.text = cardContainer[i].text;
        clipCard.mediaPath = cardContainer[i].mediaPath;
      }
    }
  }

  render() {
    return (
      <div className="clipCard"
        id = {this.state.id}
        onClick={this.placeText}
        >
        <textarea
          className="clipText"
          name = "clipText"
          defaultValue = {this.props.text}
          onChange={this.setText}
          id = {this.state.id}
          >
        </textarea>
        <div id="space"></div>
        <video
          id={this.state.id + "-vid"}
          src={this.state.mediaPath}
          controls
        >
        </video>
      </div>
    )
  }
}
