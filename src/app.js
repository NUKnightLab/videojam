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
        music: 'music.mp3',
        logo: 'logo.png',
        aspect: '1:1'
      }
    }
    this.updateGlobalPresets = this.updateGlobalPresets.bind(this);
    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);
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

  // getCards()

  addVideoObjects(event) {
    var clipCards = this.state.clipCards;
    var videoObjects = this.state.videoObjects;
    this.setState({
      videoObjects: videoObjects.concat()
    });
  }

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

  concatClips(event) {
    var clipsFolder = './clips';
    var clipNumber = 0
    var x = 0;
    var clipPaths = []
    fs.readdir(clipsFolder, (err, files) => {
        console.log(files.length);
        clipNumber = files.length;
        files.forEach(function(file) {
          clipPaths.push(file)
          mergedVideo.addInput(file)
          x++
        });
    });
    // var jj = 0
    // clipPaths.forEach(function(clip) {
    //   mergedVideo.addInput(clip)
    //   ++jj
    // });
    if (x == clipNumber) {
      mergedVideo.mergeToFile('./final.mov')
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
