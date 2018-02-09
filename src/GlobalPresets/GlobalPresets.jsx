var React = require('react');

export default class GlobalPresets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        font: 'times.ttf',
        color: 'black',
        music: 'auto.mp3',
        logo: 'knightlab.png',
        aspect: '1:1'
      }
    }
    this.changeColor = this.changeColor.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeMusic = this.changeMusic.bind(this);
    this.addCustomMusic = this.addCustomMusic.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.changeAspect = this.changeAspect.bind(this);


  }

  changeColor(event) {
    console.log("text color: " + event.target.value)
    this.setState({
      'color': event.target.value,
    })
  }

  changeFont(event) {
    console.log("Font type: " + event.target.value)
    this.setState({
      'font': event.target.value,
    })
  }

  changeMusic(event) {
    console.log("Music selection: " + event.target.value)
    this.setState({
      'music': event.target.value,
    })
  }

  addCustomMusic(event) {
    //open up a file selector to grab the font. Copy
    //the font file to the media folder. add the path
    //to the json file for saving
    console.log("hey")
  }

  addLogo(event) {
    console.log(event.target.files[0].path)
  }

  changeAspect(event) {
    console.log("Aspect ratio: " + event.target.value)
    this.setState({
      'aspect': event.target.value,
    })
  }

  render() {
    return (
      <div>
        <select
          id = "text-color-selector"
          onChange = { this.changeColor }>
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="grey">grey</option>
        </select>
        <select
          id = "font-selector"
          onChange = { this.changeFont }>
          <option value="times">Times New Roman</option>
          <option value="cambria">Cambria</option>
          <option value="comicsans">Comic Sans</option>
        </select>
        <select
          id = "music-selector"
          onChange = { this.changeMusic }>
          <option value="twinkle">Twinkle Twinkle</option>
          <option value="elevator">Elevator Music</option>
          <option onClick = { this.addCustomMusic }>Choose your own</option>
        </select>
        <div id = "logo-selector">
          <label htmlFor="file">Add a logo (png preferred)</label>
          <input
            type="file"
            onChange = { this.addLogo }></input>
        </div>
        <select
          id = "aspect-selector"
          onChange = { this.changeAspect }>
          <option value="1:1"> 1x1 - Square </option>
          <option value="16:9"> 16x9 - Full Landscape </option>
          <option value="4:5"> 4x5 - Vertical </option>
          <option value="9:16"> 9x16 - Full Portrait </option>
          <option value="1:2"> 1x2 - Newsfeed wide </option>
          <option value="2:3"> 2x3 - Facebook vertical </option>
        </select>
      </div>
    )
  }
}
// <option value="custom">add custom color</option>
