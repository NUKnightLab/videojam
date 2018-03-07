// Import libraries
var React = require('react');
const osHomedir = require('os-homedir');
const path = require('path');
var fs = require("fs");
var tmp = require('tmp');
var tmpobj = tmp.dirSync({unsafeCleanup: true});

// Set up FFmpeg
var fluent_ffmpeg = require('fluent-ffmpeg');
var ffmpegPath  = require("./../config.js").ffmpegPath;
var ffprobePath = require("./../config.js").ffprobePath;
fluent_ffmpeg.setFfmpegPath('./node_modules/ffmpeg-static' + ffmpegPath);
fluent_ffmpeg.setFfprobePath('./node_modules/ffprobe-static' + ffprobePath);
// fluent_ffmpeg.setFfmpegPath(ffmpegPath);
// fluent_ffmpeg.setFfprobePath(ffprobePath);

// Initialize global variables
var mergedVideo = fluent_ffmpeg();
// var mediaPaths = []

// Import componenets
import ClipCard from './ClipCard/ClipCard.jsx';
import MediaLibrary from './MediaLibrary/MediaLibrary.jsx';
import GlobalPresets from './GlobalPresets/GlobalPresets.jsx';
import TextChunker from './TextChunker/TextChunker.jsx';
import ClipEditor from './ClipEditor/ClipEditor.jsx'
import './app.css';

// Import styles
import './modal.css';

// Controller component
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipCards: [],
      globalPresets: {
        font: 'Verdana.ttf',
        color: '#000000',
        music: 'music.mp3',
        logo: '',
        aspect: '1:1'
      },
      open: false
    }
    this.updateGlobalPresets = this.updateGlobalPresets.bind(this);
    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);
    this.addAudio = this.addAudio.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.openPreview = this.openPreview.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
  }

  // State manager for global presets
  updateGlobalPresets(updatedGlobalPresets) {
    this.setState({ globalPresets: updatedGlobalPresets });
  }

  // Closes preview modal
  closeModal() {
    this.setState({ 'open': false, });
  }

  updateEditor(updatedEditorEndpoints) {
    this.setState({
      'editorEndpoints' : updatedEditorEndpoints,
    })
  }

  addCard(type, textChunk) {
    if (type == 'blank') {
      var clipCards = this.state.clipCards;
      clipCards.push(<ClipCard text="Fill me in" key={clipCards.length} updateEditor={this.updateEditor} index={clipCards.length}/>)
      this.setState({
        // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
        'clipCards': clipCards
      });
      console.log(clipCards)
    }
    else {
      var clipCards = this.state.clipCards;
      clipCards.push(<ClipCard text={textChunk} key={clipCards.length} updateEditor={this.updateEditor} index={clipCards.length}/>)
      this.setState({
        // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
        'clipCards': clipCards
      });
    }
  };

  // preview trigger
  // HTML5 video tag access == videoObjects[i].children[0].children[0].children[1]
  /* ISSUES
    - how to have videos loop once one finishes?
    - how to link video timing selections to the previewing?
    - how to handle non-mov/mp4 files? html5 doesn't accept them
  */

  // Opens preview modal
  openPreview(event) {
    var previewScreen = document.getElementById("previewscreen");
    previewScreen.dataset["index"] = 0;
    console.log("NOW DATA INDEX IS AT: " + previewScreen.dataset["index"])
    this.setState({
      'open': true
    })
  }

  // Grabs each media path and plays them in sequence onClick (soon will change)
  playPreview(event) {
    var videoObjects = document.getElementsByClassName('clipCard');
    var previewScreen = document.getElementById("previewscreen");
    var nextBtn = document.getElementById("nextbtn");
    //grabs data index set on preview screen element
    var currIndex = parseInt(previewScreen.dataset["index"]);
    // grabs path of video
    var video = videoObjects[currIndex].children[0].children[0].children[2].files[0].path
    // grabs HTML video element to get video timing
    var videocontainer = videoObjects[currIndex].children[0].children[0].children[1];

    previewScreen.src = video;
    console.log("video length: " + videocontainer.duration);
    console.log("current video time: " + videocontainer.currentTime)
    previewScreen.dataset["index"] = Number(previewScreen.dataset["index"]) + 1
    if (Number(previewScreen.dataset["index"]) == videoObjects.length) {
      // previewScreen.dataset["index"] = Number(previewScreen.dataset["index"]) - videoObjects.length;
      previewScreen.dataset["index"] = 0;
      console.log("turn it back around")
    }
    else {
      // currIndex += 1;
      Number(previewScreen.dataset["index"]) + 1
    }
    console.log('next btn: ' + previewScreen.dataset["index"]);
  }


  // componentDidMount() {
  //   var previewScreen = document.getElementById("previewscreen");
  //   var currIndex = parseInt(previewScreen.dataset["index"])
  //   var videocontainer = videoObjects[currIndex].children[0].children[0].children[1];
  //   document.getElementById('previewscreen').ontimeupdate = function() {console.log('curr time: ', videocontainer.currentTime)};
  //
  // }


  // Trying to track time of current video in preview
/*
    var videoObjects = document.getElementsByClassName('clipCard');
    var previewScreen = document.getElementById("previewscreen");
    var currIndex = parseInt(previewScreen.dataset["index"])
    var videocontainer = videoObjects[currIndex].children[0].children[0].children[1];
    function updateTime() {
      console.log('curr time: ', videocontainer.currentTime)
    };
    videocontainer.ontimeupdate = function() {console.log('curr time: ', videocontainer.currentTime)};
    videocontainer.addEventListener("timeupdate", updateTime)
    // console.log("track time video length: " + videocontainer.duration);
    // console.log("track time current video time: " + videocontainer.currentTime)
    if (videocontainer.duration == videocontainer.currentTime) {
      console.log("THEYRE THE SAME!")
    }
  }
  */



  // componentDidMount() {
  //   ReactDOM.findDOMNode(this).addEventListener('timeupdate', this._handleNVEvent);
  // }
  //
  // componentWillUnmount() {
  //   ReactDOM.findDOMNode(this).removeEventListener('nv-event', this._handleNVEvent);
  // }

  // Audio adding helper function for concatClips
  addAudio(obj) {
    // var outStream = fs.createWriteStream('twothirds.mov');
    var app = this;
    var globalPresets = this.state.globalPresets;

    if (obj.music != '') {
      fluent_ffmpeg()
        .input('onethird.mov')
        .input(obj.music)
        .outputOptions([
          '-codec copy',
          '-shortest'
          ])
        .save('twothirds.mov')
        .on('end', function() {
          // if (obj.logo !== '') {
          //   addLogo(fileName, presetOptions);
          //   console.log('adding logo!');
          // }
          // else {
            console.log('Finished!')
            processMessages.innerHTML += "Phase 2 done... (all done if you don't have a logo!)"
            app.addLogo(globalPresets);
          // }
        })
    }
    else { app.addLogo(globalPresets); }
  }

  // Logo adding helper function for concatClips
  addLogo(globalPresets) {
    if (globalPresets.logo != '') {
      fluent_ffmpeg()
        .input('twothirds.mov')
        .input(globalPresets.logo)
        .complexFilter('[1:v]scale=100:-1[fg];[0:v][fg] overlay=(main_w-overlay_w)-25:(main_h-overlay_h)-25')
        //.complextFilter('-vf scale=100:-1')
        .save('done.mov')
        .on('end', function() {
          console.log('Finished LOGO!');
          processMessages.innerHTML += "Your video is ready at <PATH/LINK TO VIDEO?!> "
        })
        .on('progress', function(progress) {
          console.log('Processing: ' + progress.percent + '% done');
        })
    }
  }

  // Concatenates all clips into one video
  concatClips(event) {
    var processMessages = document.getElementById("process-info");
    processMessages.innerHTML += "Getting started! Give us a few. "
    //  document.getElementsByClassName('clipCard')[0].children[0].files[0].path
    var videoObjects = document.getElementsByClassName('clipCard');
    var check = 0;
    var globalPresets = this.state.globalPresets;
    var app = this;

    //This is to grab the media path: videoObjects[i].children[0].files[0].path
    //This is to grab the text segment: videoObjects[i].children[1].value
    for (var i = 0; i < videoObjects.length; i++) {
      var outStream = fs.createWriteStream(i + '.mov');
      // var outStream = fs.createWriteStream(tmpobj.name +'/' + i + '.mov');
      fluent_ffmpeg(videoObjects[i].children[0].children[0].children[2].files[0].path)
        .videoFilters({
          filter: 'drawtext',
          options: {
            fontfile: this.state.globalPresets.font,
            text: videoObjects[i].children[1].value,
            fontsize: 50,
            fontcolor: this.state.globalPresets.color,
            shadowcolor: 'black',
            shadowx: 2,
            shadowy: 2,
            x: 50,
            y: 75
          }
        })
        .size('1200x?')
        .aspect(this.state.globalPresets.aspect)
        .autopad()
        .toFormat('mov')
        .duration(5.0)
        .videoCodec('libx264')
        .noAudio()
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .outputOptions('-strict -2')
        .save(outStream)
        .on('error', function(err) {
          console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
          console.log('Processing finished !', "number: " + check);
          if (check == videoObjects.length - 1) {
            console.log("starting to merge all videos")
            for (var j = 0; j < videoObjects.length; j++) {
              mergedVideo = mergedVideo.addInput(j + '.mov')
            };
            mergedVideo.mergeToFile('onethird.mov')
              .videoCodec('libx264')
              .audioCodec('libmp3lame')
              .format('mov')
              .outputOptions('-movflags frag_keyframe+empty_moov')
              .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
              })
              .on('end', function() {
                console.log('Video Merged')
                processMessages.innerHTML += "Phase 1 complete... (all done if you don't have music or a logo!)"
                app.addAudio(globalPresets);
              })
              .pipe(outStream, { end: true })
          }
          check++;
        })
    }
  }

  trackTime(e) {
    console.log("THIS IS TRACKTIME")
  }

  render() {
    const modalStatus = {
      display: this.state.open ? 'block' : 'none',
    }
    return (
      <div>
        <h2>Hello World!</h2>
        <TextChunker populateCards={this.addCard} />
        <GlobalPresets
          globalPresets={this.state.globalPresets}
          updateGlobalPresets={this.updateGlobalPresets} />
        <hr></hr>
        <h6>eventually media bar can go here</h6>
        <button onClick={this.openPreview}>Preview video</button>

        <div id="preview" style={modalStatus}>
          <h3 id="modal-header"> Preview your video </h3>
          <video
            controls='true'
            id='previewscreen'
            data-index='1'
            onChange = {this.trackTime}
            onTimeUpdate = {this.trackTime}
            >
          </video>
          <button id="play" onClick = {this.playPreview}>play preview!</button>
          <button id="makeit" onClick={this.concatClips}>Make my video!</button>
          <button id="closeit" onClick={this.closeModal}> Not Now </button>
        </div>

        <button onClick={ this.concatClips }>Make video</button>
        <ClipEditor editorEndpoints={this.state.editorEndpoints} />

        <div className="clipCardContainer">
          <div id="addButtonContainer">
            <div id="addClipsButton" onClick={ this.addCard }>
              <p id="addClipText"> + </p>
            </div>
          </div>
          { this.state.clipCards.map(function(clipCard, index) {
                   return clipCard })}
        </div>
        <button onClick={ this.concatClips }>make video</button>
        <div id="process-info">Video making progress: </div>
      </div>
    );
  }
}
