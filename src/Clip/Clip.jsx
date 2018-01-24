import React from 'react';

export default class Clip extends React.Component {
  render() {
    return (
      <input
        type="file"
        id="v1"
        onchange="console.log(files[0].path)"></input>
    )
  }
}
