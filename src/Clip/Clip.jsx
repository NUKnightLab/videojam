import React from 'react';

export default class Clip extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			mediaCount: 0,
			videoPaths: []
		}
    this.addPath = this.addPath.bind(this);
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

  componentDidUpdate() {
    console.log("bby!!")
  }

  render() {
    return (
      <div>
        <input
          type="file"
          id="v1"
          onChange= { this.addPath }
          >
        </input>
      </div>
    )
  }

}
