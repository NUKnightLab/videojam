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
// fluent_ffmpeg.setFfmpegPath(ffmpegPath);
// fluent_ffmpeg.setFfprobePath(ffprobePath);
fluent_ffmpeg.setFfmpegPath('./node_modules/ffmpeg-static' + ffmpegPath);
fluent_ffmpeg.setFfprobePath('./node_modules/ffprobe-static' + ffprobePath);

//initialize global variables
var mergedVideo = fluent_ffmpeg();

// Import componenets
import ClipCard from './ClipCard/ClipCard.jsx';
import MediaLibrary from './MediaLibrary/MediaLibrary.jsx';
import GlobalPresets from './GlobalPresets/GlobalPresets.jsx';
import TextChunker from './TextChunker/TextChunker.jsx';

// Import styles
import './modal.css'


// Controller component
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipCards: [],
      globalPresets: {
        font: 'Verdana.ttf',
        color: '#000000',
        music: '',
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
    this.previewVideo = this.previewVideo.bind(this);
    // this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //state manager for global presets
  updateGlobalPresets(updatedGlobalPresets) {
    this.setState({ globalPresets: updatedGlobalPresets });
  }

  // openModal() {
  //   this.setState({ 'open': true, });
  // }

  closeModal() {
    this.setState({ 'open': false, });
  }

  addCard(type, textChunk) {
    if (type == 'blank') {
      var clipCards = this.state.clipCards;
      console.log("lwngth is: " + clipCards.length)
      clipCards.push(<ClipCard text="Fill me in" key={clipCards.length} indexNum={clipCards.length} />)
      this.setState({
        // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
        'clipCards': clipCards
      });
      console.log(clipCards)
    }

    else {
      var clipCards = this.state.clipCards;
      clipCards.push(<ClipCard text={textChunk} key={clipCards.length} index={clipCards.length}/>)
      this.setState({
        // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
        'clipCards': clipCards
      });
    }
  };

  addVideoObjects(event) {
    var clipCards = this.state.clipCards;
    var videoObjects = this.state.videoObjects;
    this.setState({
      videoObjects: videoObjects.concat()
    });
  };

  // adds the most recently added video clip path to the
  // videoPaths array
  addPath(event) {
    var videoPaths = this.state.videoPaths;
    var mediaCount = this.state.mediaCount;
    //find a more elegant way to do this
    var videoPath = event.target.files[0].path;

    this.setState({
      //array only contains most recent path...
      'videoPaths': videoPaths.push(videoPath),
      'mediaCount': ++mediaCount
    });
    console.log(videoPath)
    console.log(videoPaths)
  }

  // preview trigger
  // HTML5 video tag access == videoObjects[i].children[0].children[0].children[1]
  /* ISSUES
    - how to have videos loop once one finishes?
    - how to link video timing selections to the previewing?
    - how to handle non-mov/mp4 files? html5 doesn't accept them
  */
  previewVideo(event) {
    var videoObjects = document.getElementsByClassName('clipCard');
    var previewScreen = document.getElementById("previewscreen")
    var nextBtn = document.getElementById("nextbtn");
    var mediaPaths = []

    // open preview modal
    this.setState({
      'open': true
    })

    // add all paths to clips to an array
    for (var i = 0; i < videoObjects.length; i++) {
      mediaPaths.push(videoObjects[i].children[0].children[0].children[2].files[0].path);
    }
    console.log(mediaPaths)

    // make the preview video element each video
    /* TRY 1 */
    var i = 0
    while (i < mediaPaths.length) {
      var video = videoObjects[i].children[0].children[0].children[1]
      previewScreen.src = mediaPaths[i]
      console.log(video.duration)
      i++
      nextBtn.addEventListener("click", i++);
      console.log('next btn: ' + i);
      // console.log(i(video))
    }

    /* TRY 2 */
    // nextBtn.onClick = function() {
    //   var i = 0
    //   while (i < mediaPaths.length) {
    //     var video = videoObjects[i].children[0].children[0].children[1]
    //     previewScreen.src = mediaPaths[i]
    //     console.log(video.duration)
    //     i++
    //     // nextBtn.addEventListener("click", i++);
    //     console.log('next btn: ' + i);
    //     // console.log(i(video))
    //   }
    // }
  }

  // audio adding helper function for concatClips
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
            processMessages.innerHTML += "Phase 2 done... "
            app.addLogo(globalPresets);
          // }
        })
    }
  }

  // logo adding helper function for concatClips
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

  concatClips(event) {
    processMessages.innerHTML += "Getting started! Give us a few. "
    //  document.getElementsByClassName('clipCard')[0].children[0].files[0].path
    var videoObjects = document.getElementsByClassName('clipCard');
    var check = 0;
    var globalPresets = this.state.globalPresets;
    var app = this;
    var processMessages = document.getElementById("process-info");

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
        // .aspect(this.state.globalPresets.aspect)
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
                //add audio calls add logo
                app.addAudio(globalPresets);
              })
              .pipe(outStream, { end: true })
          }
          check++;
        })
        // .pipe(outStream, { end: true })
        // .save(outStream)
    }
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
          globalPresets={ this.state.globalPresets }
          updateGlobalPresets={ this.updateGlobalPresets } />
        <hr></hr>
        <h6>eventually media bar can go here</h6>
        <button onClick={ this.addCard }>add clips</button>
          { this.state.clipCards.map(function(clipCard, index) {
                   return clipCard })}
        <button onClick={ this.previewVideo }>Preview video</button>

        <div id="preview" style={modalStatus}>
          <h3 id="modal-header"> Preview your video </h3>
          <video
            controls='true'
            id='previewscreen'>
          </video>
          <button id="nextbtn">preview next vid!</button>
          <button id="makeit">Make my video!</button>
          <button id="closeit" onClick={this.closeModal}> Not Now </button>
        </div>

        <button onClick={ this.concatClips }>Make video</button>
        <div id="process-info">Video making process: </div>
      </div>
    );
  }
}

//for clip card processing
// var outStream = fs.createWriteStream('./clips/'+Math.random().toString()+'.mov');
// fluent_ffmpeg(clipCard.mediaPath)
//   .size('1200x?')
//   .aspect('1:1')
//   .autopad()
//   .toFormat('mov')
//   .duration(5.0)
//   .videoCodec('libx264')
//   .noAudio()
//   //frag_keyframe allows fragmented output & empty_moov will cause
//   //output to be 100% fragmented; without this the first fragment
//   //will be muxed as a short movie (using moov) followed by the
//   //rest of the media in fragments.
//   .outputOptions('-movflags frag_keyframe+empty_moov')
//   .outputOptions('-strict -2')
//   // .output(outStream)
//   // .run()
//   // .pipe(outStream, { end: true })
//   // .saveToFile(outStream)
//   .on('error', function(err) {
//     console.log('An error occurred: ' + err.message);
//   })
//   .on('end', function() {
//     console.log('Processing finished !')
//   })
//   // .pipe(outStream, { end: true })
//   .save(outStream)
