import React from 'react';

export default class Clip extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
  			clipCard: []
  		}
    this.addText = this.addText.bind(this);
    this.addMediaPath = this.addMediaPath.bind(this);
	}

  // adds the most recently added video clip path to the
  // // videoPaths array
  addText(event) {
    var clipCard = this.state.clipCard;
    this.setState({
      'clipCard': clipCard.push( {text: "ayo"} )
    })
    console.log(clipCard);
  }

  addMediaPath(event) {
    var clipCard = this.state.clipCard;
    this.setState({
      'clipCard': clipCard.push( {mediaPath: event.target.files[0].path} )
    })
    console.log(clipCard);
  }

  /*** LATER: UPDATE TO SHOW VARIOUS PARTS
 OF A CLIP

STATE: represents the pieces of the clipCard
-- should be an object for access
 ****/

  render() {
    return (
      <div>
        <input
          type="file"
          id="v1"
          onChange= { this.addMediaPath }
          >
        </input>
        <textarea
          defaultValue = "fill me in"
          >
        </textarea>
        <button
          onClick = { this.addText }
          >
          donezo
        </button>
      </div>
    )
  }
}

// onChange = { this.addText }
