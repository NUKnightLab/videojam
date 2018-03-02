var React = require('react');
import './GlobalPresets.css'

export default class GlobalPresets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        font: 'Verdana.ttf',
        color: '#000000',
        music: 'music.mp3',
        logo: 'logo.png',
        aspect: '2:1'
      }
    }
    this.changeColor = this.changeColor.bind(this);
    this.changeFont = this.changeFont.bind(this);
    this.changeMusic = this.changeMusic.bind(this);
    this.addCustomMusic = this.addCustomMusic.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.changeAspect = this.changeAspect.bind(this);
    this.showGlobalPresets = this.showGlobalPresets.bind(this);



  }

  //monitors text color selection dropdown
  changeColor(event) {
    console.log(this.props.globalPresets)
    // console.log("text color: " + event.target.value)
    this.setState({
      'color': event.target.value,
    });
    var globalPresets = this.props.globalPresets;
    globalPresets.color = event.target.value;
    this.props.updateGlobalPresets(globalPresets);
    console.log("global text color state: " + globalPresets.color)
  }

  //monitors font selection dropdown
  changeFont(event) {
    // console.log("Font type: " + event.target.value)
    this.setState({
      'font': event.target.value,
    });
    var globalPresets = this.props.globalPresets;
    globalPresets.font = event.target.value;
    this.props.updateGlobalPresets(globalPresets);
    console.log("global font state: " + globalPresets.font)
  }

  //monitors music selection dropdown
  changeMusic(event) {
    // console.log("Music selection: " + event.target.value)
    this.setState({
      'music': event.target.value,
    });
    if (event.target.value == "choose") {
      console.log("THIS IS IMPORTANT")
      this.addCustomMusic()
    }
    var globalPresets = this.props.globalPresets;
    globalPresets.music = event.target.value;
    this.props.updateGlobalPresets(globalPresets);
    console.log("global music state: " + globalPresets.music)
  }

  //monitors music upload option
  addCustomMusic(event) {
    // <div id="myModal" class="modal">
    //   <div class="modal-content">
    //     <span class="close">&times;</span>
    //     <p>Some text in the Modal..</p>
    //   </div>
    // </div>
    console.log("IN CUSTOM MUSIC FUNCTION")
  }

  //monitors logo upload button
  addLogo(event) {
    // console.log(event.target.files[0].path)
    var globalPresets = this.props.globalPresets;
    globalPresets.logo = event.target.files[0].path;
    this.props.updateGlobalPresets(globalPresets);
    console.log("global logo state: " + globalPresets)
  }

  //monitors aspect ratio selection dropdown
  changeAspect(event) {
    // console.log("Aspect ratio: " + event.target.value)
    this.setState({
      'aspect': event.target.value,
    });
    var globalPresets = this.props.globalPresets;
    globalPresets.aspect = event.target.value;
    this.props.updateGlobalPresets(globalPresets);
    console.log("global aspect ratio state: " + globalPresets)
  }

  showGlobalPresets(event) {
    console.log(this.props.globalPresets)
  }

  render() {
    return (
      <div
        className="globalpresets"
        onChange = { this.showGlobalPresets }>
        <div className="presetwrapper">
          <h5 className="presetlabel">Text color</h5>
          <select
            id = "text-color-selector"
            onChange = { this.changeColor }>
            <option value="#000000">Black</option>
            <option value="#ffffff">White</option>
            <option value="#6d6d6d">Grey</option>
          </select>
        </div>
        <div className="presetwrapper">
          <h5 className="presetlabel">Font style</h5>
          <select
            id = "font-selector"
            onChange = { this.changeFont }>
              <option
                value="Verdana.ttf"
                id="verdana">
                Verdana
              </option>
              <option
                value="neuton"
                id="neuton">
                Neuton
              </option>
              <option
                value="roboto"
                id="roboto">
                Roboto
              </option>
              <option
                value="anton"
                id="anton">
                Anton
              </option>
          </select>
        </div>
        <div className="presetwrapper">
          <h5 className="presetlabel">Aspect ratio</h5>
          <select
            id = "aspect-selector"
            onChange = { this.changeAspect }>
            <option value='1:1'> Square </option>
            <option value='16:9'> Full Landscape </option>
            <option value='4:5'> Vertical </option>
            <option value='9:16'> Full Portrait </option>
            <option value='1:2'> Newsfeed wide </option>
            <option value='2:3'> Facebook vertical </option>
          </select>
        </div>
        <div className="presetwrapper">
          <h5 className="presetlabel">Background music</h5>
          <select
            id = "music-selector"
            onChange = { this.changeMusic }>
            <option value="./media/music.mp3">Twinkle Twinkle</option>
            <option value="./media/music2.mp3">Elevator Music</option>
            <option value="./media/music3.mp3">Classic Jam</option>

          </select>
        </div>
        <div className="presetwrapper">
          <h5 className="presetlabel">Logo</h5>
          <div id = "logo-selector">
            <input
              type="file"
              onChange = { this.addLogo }></input>
          </div>
        </div>
      </div>
    )
  }
}
// <option value="custom">add custom color</option>

/*
<option
  id = "custommusic"
  onClick = { this.addCustomMusic }
  value = "choose">
  Choose your own</option>
*/
