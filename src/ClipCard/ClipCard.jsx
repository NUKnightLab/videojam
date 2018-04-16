// Import modules
import React from 'react';
var rand = require("random-key");

// Import styles
import './ClipCard.css';

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
    this.placeText = this.placeText.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
	}

  componentDidMount() {
      // creates a unique ID string for each clip card, updates ID state
      var id = rand.generate();
      var clipCard = this.state.clipCard;
      clipCard.id = id;

      this.setState({
        'id': id,
        'clipCard': clipCard,
      });

      // adds clip card to app.js card container array
      var cardContainer = this.props.cardContainer;
      cardContainer.push(clipCard);
      this.props.updateCardContainer(cardContainer);
      console.log("cardContainer: " + cardContainer)
    }

  // // // // WHAT DOES THIS DO & WHERE IS INDEX FROM // // // //
  updateEditor() {
    this.props.updateEditor(this.props.index);
	}

  // MANUALLY puts text/id of individ clipCard into editor window.
  // DOESN'T use state, but this function needs to use clipContainer state
  placeText(event) {
    // grab editor window elements
    var editorText = document.getElementById("editorText");
    var editorVideo = document.getElementById("editorVideo");

    // set attributes to be specific to the card selected
    editorText.cardindex = this.props.index;
    editorText.cardkey = this.state.id;
    editorVideo.cardindex = this.props.index;
    editorVideo.cardkey = this.state.id;

    // set the editor window attributes to be the selected card vals
    editorText.value = event.target.children[0].children[1].value;
    editorVideo.src = event.target.children[2].src;
  }

  render() {
    return (
      <div className="clipCard"
        id = {this.state.id}
        onClick={this.placeText}
        >
        <div id="numbercontainer">
          <p id="cardindex">{this.props.index}</p>
          <textarea
            className="clipText"
            name = "clipText"
            defaultValue = {this.props.text}
            id = {this.state.id}
            >
          </textarea>
        </div>
        <div id="spce"></div>
        <video
          id={this.state.id + "-vid"}
          src={this.state.clipCard.mediaPath}
        >
        </video>
      </div>
    )
  }
}
// div id = space
//             onClick = {this.updateText}
