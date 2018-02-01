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
import ClipCard from './ClipCard/ClipCard.jsx';
import MediaLibrary from './MediaLibrary/MediaLibrary.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipCards: []
      //first one doesn't get added to arr
    }

    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);
  }

  addCard(event) {
    var clipCards = this.state.clipCards;
    clipCards.push(<ClipCard key={clipCards.length} />)
    this.setState({
      // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
      'clipCards': clipCards
    });
    console.log(clipCards)
  };

  // getCards()

  addVideoObjects(event) {
    var clipCards = this.state.clipCards;
    var videoObjects = this.state.videoObjects;
    this.setState({
      videoObjects: videoObjects.concat()
    });
  }

  componentDidUpdate() {
    console.log("Hi!!")
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
        <MediaLibrary />
        <button onClick={this.addCard}>add clips</button>
        {this.state.clipCards.map(function(clipCard, index) {
          return clipCard
        })}
        <button onClick={this.concatClips}>make video</button>
      </div>
    );
  }
}
