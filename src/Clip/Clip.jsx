import React from 'react';
import './Clip.css';

export default class Clip extends React.Component {
  render() {
    return (
      <div className="clip-card">
        <input
          type="file"
          id="v1">
        </input>

        <textarea
          id="text-field"
          ref="textArea"
        >
        </textarea>
      </div>

    )
  }
}
