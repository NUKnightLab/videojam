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
    // this.setText = this.setText.bind(this);
    this.placeText = this.placeText.bind(this);
    this.updateText = this.updateText.bind(this);
    // this.setMediaPath = this.setMediaPath.bind(this);
    // this.passUp = this.passUp.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
    // this.updateCardContainer = this.updateCardContainer.bind(this);
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
    var editorText = document.getElementById("editorText");
    // editorText.cardindex = this.props.index;
    // editorText.cardkey = this.state.id;
    // var editorTextIndex = editorText.cardindex
    // var cardContainer = this.props.cardContainer;
    console.log(event.target.children[1].value)
    editorText.value = event.target.children[1].value;
    // var currCardInfo = cardContainer[editorTextIndex]
    // var currCardText = document.getElementById(currCardInfo['id']).children[0].children[1]
    // console.log("desired text: ", currCardText.value)
    // editorText.value = currCardText.value;

    // var clipCard = this.state.clipCard;
    // console.log(clipCard)
    // editorText.cardindex = this.props.index;
  }

  // updateText(event) {
  //   var cardContainer = this.props.cardContainer;
  //   // console.log("omg")
  //
  //   for (var i = 0; i < cardContainer.length; i++) {
  //     if (cardContainer[i].id = event.target.id) {
  //       console.log("event id: " + event.target.id)
  //       console.log("text of cc: " + cardContainer[i].text)
  //       event.target.value = cardContainer[i].text;
  //     }
  //     else { i++ }
  //   }
  // }

  // TRIES (fails) to set its text to editor window's text
  // setText(event) {
  //   var clipCard = this.state.clipCard;
  //   var cardContainer = this.props.cardContainer;
  //   for (var i = 0; i < cardContainer.length; i++) {
  //     if (cardContainer[i].id == clipCard.id) {
  //       console.log("Matching IDs: " + cardContainer[i].id, " ", clipCard.id)
  //       clipCard.text = cardContainer[i].text;
  //       clipCard.mediaPath = cardContainer[i].mediaPath;
  //     }
  //   }
  // }

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



// <div className="clipCard"
//   id = {this.state.id}
//   onClick={this.placeText}
//   >
//   <textarea
//     className="clipText"
//     name = "clipText"
//     defaultValue = {this.props.text}
//     onChange={this.setText}
//     id = {this.state.id}
//     >
//   </textarea>
//   <div id="space"></div>
//   <video
//     id={this.state.id + "-vid"}
//     src={this.state.clipCard.mediaPath}
//   >
//   </video>
// </div>
//
