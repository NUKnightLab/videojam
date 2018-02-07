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
fluent_ffmpeg.setFfmpegPath(osHomedir() + '/desktop/knight-lab/2017-2018/jam/videojam/node_modules/ffmpeg-static' + ffmpegPath);
fluent_ffmpeg.setFfprobePath(osHomedir() + '/desktop/knight-lab/2017-2018/jam/videojam/node_modules/ffmpeg-static' + ffprobePath);

//initialize global variables
var mergedVideo = fluent_ffmpeg();

// Import componenets
import ClipCard from './ClipCard/ClipCard.jsx';
import MediaLibrary from './MediaLibrary/MediaLibrary.jsx';

// Controller component
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipCards: []
    }

    this.addCard = this.addCard.bind(this);
    this.concatClips = this.concatClips.bind(this);
  }

  addCard(event) {
    var clipCards = this.state.clipCards;
    var newCard = React.createElement(ClipCard, {key: clipCards.length});
    // var newCard = new ClipCard
    clipCards.push(newCard)
    this.setState({
      // 'clipCards': clipCards.concat(<ClipCard key={clipCards.length} />)
      'clipCards': clipCards
    });
    console.log(clipCards)
    // var inputs = document.getElementsByTagName("input")
    // console.log(inputs)
  };


  concatClips(event) {
    var mediaInputs =  document.getElementsByTagName("input")
    var textInputs =  document.getElementsByTagName("textarea")
    var paths = []
    var texts = []

    for (var i = 0; i < mediaInputs.length; ++i) {
      paths.push(mediaInputs[i].files[0].path)
      texts.push(textInputs[i].value)
    }

    var x = 0;
    paths.forEach(function(path) {
      var outStream = fs.createWriteStream('./' + x + '.mov');
      console.log(outStream.path);
      fluent_ffmpeg(path)
        .size('1200x?')
        .aspect('1:1')
        .autopad()
			  .toFormat('mov')
        .duration(5.0)
        .videoCodec('libx264')
    		.noAudio()
        //frag_keyframe allows fragmented output & empty_moov will cause
        //output to be 100% fragmented; without this the first fragment
        //will be muxed as a short movie (using moov) followed by the
        //rest of the media in fragments.
        .outputOptions('-movflags frag_keyframe+empty_moov')
        .outputOptions('-strict -2')
        // .output(outStream)
        // .run()
        // .pipe(outStream, { end: true })
        // .saveToFile(outStream)
        .on('error', function(err) {
          console.log('An error occurred: ' + err.message);
		  	})
        .on('end', function() {
          console.log('Processing finished !')
        })
        // .pipe(outStream, { end: true })
        .save(outStream)
      ++x
    })
    // console.log(paths)
    // console.log(texts)
  }


  render() {

    return (
      <div>
        <h2>Hello World!</h2>
        <MediaLibrary />
        <button onClick={this.addCard}>add clips</button>
          {this.state.clipCards.map(function(clipCard, index) {
                   return clipCard })}
        <button onClick={this.concatClips}>make video</button>
      </div>
    );
  }
}


// instantiate React component:
// https://stackoverflow.com/questions/36471869/rendering-a-string-as-react-component#comment60556701_36471869

// getCards()
//
// addVideoObjects(event) {
//   var clipCards = this.state.clipCards;
//   var videoObjects = this.state.videoObjects;
//   this.setState({
//     videoObjects: videoObjects.concat()
//   });
// }
//
// componentDidUpdate() {
//   console.log("Hi!!")
// }

// adds the most recently added video clip path to the
// videoPaths array
// addPath(event) {
//   var videoPaths = this.state.videoPaths;
//   var mediaCount = this.state.mediaCount;
//   //find a more elegant way to do this
//   var videoPath = event.target.files[0].path;
//
//   this.setState({
//     //array only contains most recent path...
//     'videoPaths': videoPaths.push(videoPath),
//     'mediaCount': ++mediaCount
//   });
//   console.log(videoPath)
//   console.log(videoPaths)
// }


    // clipCards.forEach(function(clipCard) {
    //   var outStream = fs.createWriteStream('./' + x + '.mov');
    //   console.log(outStream.path);
    //   fluent_ffmpeg(clipCard.mediaPath)
    //     .size('1200x?')
    //     .aspect('1:1')
    //     .autopad()
		// 	  .toFormat('mov')
    //     .duration(5.0)
    //     .videoCodec('libx264')
    // 		.noAudio()
    //     //frag_keyframe allows fragmented output & empty_moov will cause
    //     //output to be 100% fragmented; without this the first fragment
    //     //will be muxed as a short movie (using moov) followed by the
    //     //rest of the media in fragments.
    //     .outputOptions('-movflags frag_keyframe+empty_moov')
    //     .outputOptions('-strict -2')
    //     // .output(outStream)
    //     // .run()
    //     // .pipe(outStream, { end: true })
    //     // .saveToFile(outStream)
    //     .on('error', function(err) {
    //       console.log('An error occurred: ' + err.message);
		//   	})
    //     .on('end', function() {
    //       console.log('Processing finished !')
    //     })
    //     // .pipe(outStream, { end: true })
    //     .save(outStream)
    //     ++x
          // mergedVideo = mergedVideo.addInput(tmpobj.name + '/' + jj + '.mov');
          // x++;
      		// if (x == videoCount) {
          //   mergedVideo.mergeToFile('final.mov', './tmp/')
      		// 	  .videoCodec('libx264')
      	  //     .audioCodec('libmp3lame')
      		// 		.format('mov')
      		// 		.outputOptions('-movflags frag_keyframe+empty_moov')
      		// 		.on('error', function(err) {
      		// 		  console.log('Error ' + err.message);
      		// 		})
      		// 		.on('end', function() {
          //       console.log('Finished!');
          //     })
          // }
    // .pipe(outStream, { end: true });
        // .pipe('final.mp4', { end: true });
  //   })
  // }



  // concatClips(event) {
  //   var outPath = path.join(__dirname, 'out.mp4');
  //   // var outPath = './out.mp4';
  //   // var msgArea = document.getElementById("msgs");
  //
  //   var clipCards = this.state.clipCards;
  //   var x = 0;
  //
  //   var addOn = 'fluent_ffmpeg('+ clipCards[0].mediaPath + ')'
  //   console.log(clipCards)
  //
  //   console.log()
  //   clipCards.forEach(function(clipCard) {
  //     addOn += '.input'+(clipCard.mediaPath)
  //   })
  //   // console.log(addOn)
  //   // var outStream = fs.createWriteStream('./' + x + '.mov');
  // }
