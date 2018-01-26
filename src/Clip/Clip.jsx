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
    var videoPath = event.target.files[0].path;
    this.setState({
      'videoPaths': videoPaths.push(videoPath),
      'mediaCount': ++mediaCount
    });
    console.log(videoPath)
    console.log(videoPaths)
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
