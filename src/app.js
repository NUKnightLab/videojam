import React from 'react';
import Clip from './Clip/Clip.jsx';
import TextChunker from './TextChunker/TextChunker.jsx';

export default class App extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    console.log('hi!!');
  }

  render() {
    return (
      <div>
        Hello World!
        <TextChunker />

        <Clip />

      </div>
    );
  }
}
