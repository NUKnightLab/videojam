import React from 'react';
import './TextChunker.css';

export default class TextChunker extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      open: true,
		}

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ 'open': false, })
  }

  render() {
    const modalStatus = {
      display: this.state.open ? 'initial' : 'none',
    }
    return (
      <div id="text-chunker" style={modalStatus}>
        <h3 id="modal-header"> Enter your story to begin </h3>
        <textarea
          id="text-to-chunk"
        >
        </textarea>

        <button id="dont-chunk" onClick={this.closeModal}> Not Now </button>

      </div>

    )
  }
}
