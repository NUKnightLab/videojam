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
      }
    }
    this.updateGlobalPresets = this.updateGlobalPresets.bind(this);
    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);
    this.addAudio = this.addAudio.bind(this);
    this.addLogo = this.addLogo.bind(this);
  }

  //state manager for global presets
  updateGlobalPresets(updatedGlobalPresets) {
    this.setState({ globalPresets: updatedGlobalPresets });
  }

  addCard(type, textChunk) {
    if (type == 'blank') {
      var clipCards = this.state.clipCards;
      clipCards.push(<ClipCard text="Fill me in" key={clipCards.length} />)
      this.setState({
        // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
        'clipCards': clipCards
      });
      console.log(clipCards)
    }

    else {
      var clipCards = this.state.clipCards;
      clipCards.push(<ClipCard text={textChunk} key={clipCards.length} />)
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
        })
        .on('progress', function(progress) {
          console.log('Processing: ' + progress.percent + '% done');
        })
    }
  }

  concatClips(event) {
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
      fluent_ffmpeg(videoObjects[i].children[0].files[0].path)
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
        <button onClick={ this.concatClips }>make video</button>
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
