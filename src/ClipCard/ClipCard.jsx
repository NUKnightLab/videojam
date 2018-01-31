import React from 'react';

export default class ClipCard extends React.Component {
  constructor(props) {
		super(props);
  		this.state = {
        //clipCard: []
  			clipCard: {
          mediaPath: '',
          text: ''
        }
  		}
    this.setText = this.setText.bind(this);
    this.setMediaPath = this.setMediaPath.bind(this);
	}

  componentDidUpdate() {
    console.log(this.state.clipCard);
  }

  setText(event) {
    var clipCard = this.state.clipCard;
    clipCard.text = event.target.value;
    this.setState({
      'clipCard': clipCard,
    });
  }

  setMediaPath(event) {
    var clipCard = this.state.clipCard;
    clipCard.mediaPath = event.target.files[0].path;
    this.setState({
      'clipCard': clipCard,
    });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          id="v1"
          onChange= { this.setMediaPath }
          >
        </input>
        <textarea
          name = "clipText"
          defaultValue = "fill me in"
          onChange = { this.setText }
          >
        </textarea>
      </div>
    )
  }
}
