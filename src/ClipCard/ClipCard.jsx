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
          text: props.text
        },
        id: ''
  		}
      // this.seeMe = this.seeMe.bind(this);
      this.updateEditorVal = this.updateEditorVal.bind(this);
      this.setText = this.setText.bind(this);
    }

    componentDidMount() {
      var id = rand.generate();
      this.setState({
        'id': id,
      })
    }

    setText(event) {
      // var selected = document.getElementsByClassName('clipCard');
      // console.log("id state: "+ this.state.id)
      var targetElem = event.target;
      var id = this.state.id;
      var editorText = document.getElementById("editorText");
      var text = targetElem.value;
      editorText.value = text;
      editorText.cardkey = id;
      console.log("editor carkey: "+ editorText.cardkey)
      // var clipCard = this.state.clipCard;
      // clipCard.text = document.getElementById("editorText").value;
      // this.setState({
      //   'clipCard': clipCard,
      // })
      // console.log("OTHER CLIPCARD LOL: " + clipCard.text)
    }

    updateEditor() {
      this.props.updateEditor(this.props.index);
      // onClick={this.updateEditor}
  	}

    updateEditorVal(event) {
      var editorText = document.getElementById("editorText");
      var text = document.getElementById(this.state.id).value
      editorText.value = text;
      editorText.cardkey = this.state.id;
    }

// used to be called by clipCard div onClick
    // seeMe(event) {
    //   var selected = document.getElementsByClassName('clipCard');
    //   var targetElem = event.target;
    //   var id = this.state.id;
    //   var editorText = document.getElementById("editorText");
    //   var text = event.target.value;
    //   editorText.value = text;
    //   editorText.cardkey = id;
    //   console.log(editorText.cardkey)
    // }

    render() {
      return (
        <div className="clipCard"
          id = {this.state.id}>
          <textarea
            className="clipText"
            name = "clipText"
            defaultValue = {this.props.text}
            onChange = {this.setText}
            id = {this.state.id}
            >
          </textarea>
        </div>
      )
    }
  }

  //onClick = {this.updateEditorVal}
