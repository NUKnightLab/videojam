import React from 'react';

export default class App extends React.Component {
  dateTime() {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    return datetime
  }
  render() {
    return (
      <div>
        Hello World!
        <a href="https://willowtreeapps.com/careers">Come work with me.</a>
        <p>{this.dateTime()}</p>
      </div>
    );
  }
}
