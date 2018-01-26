// Set up React and FFmpeg
var React = require('react');
var fluent_ffmpeg = require("fluent-ffmpeg");
var ffmpegPath  = require("./../config.js").ffmpegPath;
var ffprobePath = require("./../config.js").ffprobePath;
fluent_ffmpeg.setFfmpegPath(ffmpegPath);
fluent_ffmpeg.setFfprobePath(ffprobePath);
const path = require('path');
var mergedVideo = fluent_ffmpeg();

// Import libraries
var fs = require("fs");
var tmp = require('tmp');
var tmpobj = tmp.dirSync({unsafeCleanup: true});

// Import componenets
import Clip from './Clip/Clip.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoObjects: [],
      clipCards: []
    }

    // this.createVideoObjects = this.createVideoObjects.bind(this);
    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);

  }

  // createVideoObjects(newVideoObjects) {
  //   this.setState({ videoObjects: newVideoObjects });
  // };

  addCard(event) {
    var clipCards = this.state.clipCards;
    this.setState({
      'clipCards': clipCards.concat(<Clip key={clipCards.length} />)
    });
    console.log(clipCards)
  };

  addVideoObjects(event) {
    var clipCards = this.state.clipCards;
    var videoObjects = this.state.videoObjects;
    this.setState({
      videoObjects: videoObjects.concat()
    });
  }

  concatClips(event) {
    // var outPath = path.join(__dirname, 'out.mp4');
    var outPath = './out.mp4';
    var msgArea = document.getElementById("msgs");
    var videoObjects = this.state.videoObjects;
    var x = 0;

    var outStream = fs.createWriteStream(tmpobj.name +'/' + x + '.mov');
    videoObjects.forEach(function(videoObject) {
      fluent_ffmpeg(videoObject.video_path)
        .size('1200x?')
        .aspect('1:1')
        .autopad()
			  .format('mov')
        .duration(5.0)
        .videoCodec('libx264')
    		.noAudio()
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .on('error', function(err) {
          console.log('An error occurred: ' + err.message);
		  	})
        .on('end', function() {
          console.log('Processing finished !');
          mergedVideo = mergedVideo.addInput(tmpobj.name + '/' + jj + '.mov');
          x++;
      		if (x == videoCount) {
            mergedVideo.mergeToFile('final.mov', './tmp/')
      			  .videoCodec('libx264')
      	      .audioCodec('libmp3lame')
      				.format('mov')
      				.outputOptions('-movflags frag_keyframe+empty_moov')
      				.on('error', function(err) {
      				  console.log('Error ' + err.message);
      				})
      				.on('end', function() {
                console.log('Finished!');
              })
          }
        })
        .pipe(outStream, { end: true });
        // .pipe('final.mp4', { end: true });
    })
  }

  render() {
    return (
      <div>
        <h2>Hello World!</h2>
        <button onClick={this.addCard}>add clips</button>
        {this.state.clipCards.map(function(clipCard, index) {
          return clipCard
        })}
        <button onClick={this.concatClips}>make video</button>
      </div>
    );
  }
}
