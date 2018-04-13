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
        clipCard: {
          mediaPath: '',
          // text: props.text,
          text: '',
          id: ''
        },
      }
      this.updateText = this.updateText.bind(this);
      this.updateMedia = this.updateMedia.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.updateCard = this.updateCard.bind(this);
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
