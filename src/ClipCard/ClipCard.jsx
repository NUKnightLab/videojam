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
    this.updateCardContainer = this.updateCardContainer.bind(this);
	}

  componentDidMount() {
      var id = rand.generate();
      this.setState({
        'id': id,
      });

      var clipCard = this.state.clipCard;
      clipCard.id = id;
      this.setState({
        'clipCard': clipCard,
      });

      var cardContainer = this.props.cardContainer;
      for (var i = 0; i < cardContainer.length; i++) {
        if (cardContainer[i].id == clipCard.id) {
          break;
        }
      }
      cardContainer.push(clipCard);
      this.props.updateCardContainer(cardContainer);

      // console.log("id: ", id);
      // var cardContainer = this.props.cardContainer;
      console.log(cardContainer)
      // cardContainer.push(clipCard)
      // this.props.updateCardContainer(cardContainer.push(clipCard))
      // console.log(this.props.cardContainer)
      // var ids = this.props.ids;
      // ids = ids.push(id);
      // console.log("array of ids:", ids)
    }

  updateEditor() {
    this.props.updateEditor(this.props.index);
	}

  updateCardContainer() {
    this.props.updateCardContainer(this.state.clipCard)
  }

  setText(event) {
    var clipCard = this.state.clipCard;
    clipCard.text = event.target.value;
    this.setState({
      'clipCard': clipCard,
    });
    var editorText = document.getElementById("editorText");
    editorText.value = clipCard.text;
    // editorText.cardkey = clipCard.id;
    console.log(editorText.cardkey)
  }

  placeText(event) {
    var editorText = document.getElementById("editorText");
    var clipCard = this.state.clipCard;
    editorText.value = clipCard.text;
    editorText.cardkey = this.state.id;
    console.log(editorText.cardkey)

  }

  // passUp(event) {
  //   var editorText = document.getElementById("editorText");
  //   editorText.value = this.state.clipCard.text;
  //   console.log(editorText.value)
  // }

  // setMediaPath(event) {
  //   var clipCard = this.state.clipCard;
  //   clipCard.mediaPath = event.target.files[0].path;
  //   this.setState({
  //     'clipCard': clipCard,
  //   });
    // var cardContainer = this.props.cardContainer;
    // cardContainer = cardContainer.push(clipCard);
    // this.props.updateCardContainer(cardContainer);
    // console.log(cardContainer)
  // }

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
      </div>
    )
  }
}
