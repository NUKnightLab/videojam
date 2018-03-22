import React from 'react';
import ReactDOM from 'react-dom';
import './ClipEditor.css';
const osHomedir = require('os-homedir');
var fs = require("fs");

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var mergedVideo = fluent_ffmpeg();

// Import componenets
import Dropzone from 'react-dropzone';


export default class ClipEditor extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        text: 'Choose a clipcard',
        clipCard: {
          mediaPath: '',
          text: props.text,
          id: ''
        },
      }
      this.updateText = this.updateText.bind(this);
      this.onDrop = this.onDrop.bind(this);
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


        // cardContainer[0].text == editorText.value;
        // this.props.updateCardContainer(cardContainer);
        // console.log("cards: ", cardContainer)
        // console.log(clipCard);
        // var cardContainer = this.props.cardContainer;
        // var arr = cardContainer.concat(clipCard);
        // this.props.updateCardContainer(arr);
        // console.log(arr)
        // cardContainer[0].text = "heyo"
        // console.log(cardContainer[0])
        // this.props.updateCardContainer(cardContainer)
        // for (var i = 0; i < cardContainer.length; i++) {
        //   if (cardContainer[i].id == clipCard.id) {
        //     clipCard.text == cardContainer[i].text;
        //     console.log(cardContainer[i])
        //     // this.setState({
        //     //   'cardContainer': cardContainer
        //     // })
        //     this.props.updateCardContainer(cardContainer)
        //     // console.log("WE MATCH")
        //     // console.log()
        //   }
        // }
      }
      //
      // updateCardContainer() {
      //   this.props.updateCardContainer(this.state.clipCard)
      // }
      passMedia(event) {
        console.log("gonna make this work later")
      }

      onDrop(files) {
        console.log('dropzone ', files[0].path)
        // document.getElementsByClassName("clip-instruction")[this.props.index].style.display = "none";
        var clipCard = this.state.clipCard;
        clipCard.mediaPath = files[0].path;
        this.setState({
          'clipCard': clipCard,
        });
        var cardContainer = this.props.cardContainer;
        cardContainer = cardContainer.concat(clipCard);
        console.log(cardContainer);
        this.props.updateCardContainer(cardContainer);
        console.log(clipCard);
        var video = document.getElementById("video-input" + this.props.index);
        video.src = files[0].path;
        document.getElementById("placeholder").style.display="none";
      }

    render() {
      return (
      <div>
        <div ref={"clipEditor"} className="clipEditor">
            <div className="videotextcontainer">
              <div className="dropzone">
                <Dropzone className="dropzone-styles" onDrop={this.onDrop.bind(this)}>
                  <p className="clip-instruction">Drop or click to add a video.</p>
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
            <textarea
              id="editorText"
              defaultValue={this.state.text}
              onChange={this.updateText}
              cardkey=''
            >
            </textarea>
          </div>
        </div>
      </div>
    )
  }
}
