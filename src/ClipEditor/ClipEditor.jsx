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
      this.onDrop = this.onDrop.bind(this);
      this.updateCard = this.updateCard.bind(this);
  		}

      // componentDidUpdate() {
      //   if (!isNaN(this.props.editorEndpoints)) {
      //     var selected = document.getElementsByClassName('clipCard')[this.props.editorEndpoints].children;
      //     if ((this.state.clipCard.mediaPath != (selected[0].children[0].children[2].files.length > 0 ? selected[0].children[0].children[2].files[0].path : '')) | this.state.clipCard.text != selected[1].value ) {
      //       console.log(this.state.clipCard.text)
      //       this.state.clipCard.mediaPath = selected[0].children[0].children[2].files.length > 0 ? selected[0].children[0].children[2].files[0].path : '';
      //       this.state.clipCard.text = selected[1].value
      //       this.setState({
      //         'clipCard': clipCard
      //       })
      //       document.getElementById("editorText").value = selected[1].value;
      //     }
      //   }
      //   console.log(this.state.clipCard)
      // }

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

      updateCard(event) {
        var editorText = document.getElementById("editorText");
        var editorTextIndex = document.getElementById("editorText").cardindex;
        var cardContainer = this.props.cardContainer;
        console.log("we're here: ", cardContainer[editorTextIndex])

        var currCardInfo = cardContainer[editorTextIndex]
        var currCardText = document.getElementById(currCardInfo['id']).children[0].children[1]
        currCardText.value = editorText.value

        var currCardMedia = document.getElementById(currCardInfo['id']).children[2]
        currCardMedia.src = currCardInfo['mediaPath']

        console.log(currCardInfo['mediaPath'])
      }

      onDrop(files) {
        // console.log('dropzone ', files[0].path)
        var clipCard = this.state.clipCard;
        clipCard.mediaPath = files[0].path;
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

        var video = document.getElementById("video-input" + this.props.index);
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
                    id={"video-input" + this.props.index}
                    width="440"
                    height="360"
                    src={this.state.mediaPath}
                    controls
                    onChange={this.passMedia}>
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
