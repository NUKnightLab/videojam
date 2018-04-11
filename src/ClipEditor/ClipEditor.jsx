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
        var editorVideo = document.getElementById("editorVideo");
        // grab selected card's index
        var editorTextIndex = document.getElementById("editorText").cardindex;

        // grab array holding each clipcard's info
        var cardContainer = this.props.cardContainer;
        // get selected clipcard's info
        var currCardInfo = cardContainer[editorTextIndex]
        console.log("current card state: ", currCardInfo)
        // get the current card's text value
        var currCardText = document.getElementById(currCardInfo['id']).children[0].children[1]
        // update the card's text value to be the editor text's value
        currCardText.value = editorText.value

        // var currCardMedia = document.getElementById(currCardInfo['id']).children[2].src;
        var currCardMedia = document.getElementById("editorVideo").src;

        var clipCard = this.state.clipCard;
        clipCard.mediaPath = currCardMedia;
        this.setState({
          'clipCard': clipCard,
        });
        // currCardMedia.src = currCardInfo['mediaPath']
        // currCardMedia.src = this.state.clipCard.mediaPath;

        console.log("card container: ", cardContainer)
      }

      onDrop(files) {
        // console.log('dropzone ', files[0].path)
        var clipCard = this.state.clipCard;
        // clipCard.mediaPath = files[0].path;
        clipCard.mediaPath = document.getElementById("editorVideo").src;
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
