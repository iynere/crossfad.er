import React, {Component} from 'react'
import {Link} from 'react-router'
import YouTube from 'react-youtube'
import Slider from 'react-bootstrap-slider'

// import Playlist1 from './Playlist1'
// import Playlist2 from './Playlist2'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import Main from './Main'

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      aFade: 50,
      aMin: 0,
      aMax: 100,
      aStep: 1,
      vFade: 0.5,
      vMin: 0.0,
      vMax: 1.0,
      vStep: 0.1
    }
    this.saveVideo1State = this.saveVideo1State.bind(this)
    this.saveVideo2State = this.saveVideo2State.bind(this)
    this.isPlaying = this.isPlaying.bind(this)
    this.aHandleChange = this.aHandleChange.bind(this)
    this.vHandleChange = this.vHandleChange.bind(this)
  }
  
  saveVideo1State(event) {
    this.video1 = event.target
  }
  
  saveVideo2State(event) {
    this.video2 = event.target
  }
  
  isPlaying(video) {
    return video.getPlayerState() === 1
  }
  
  aHandleChange(event) {
    
  }
  
  vHandleChange(eveng) {
    
  }
  
  render() {
    const options = {
      width: window.innerWidth - 30,
      height: window.innerHeight - 140,
      playerVars: {
        cc_load_policy: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        fs: 0
      }
    }
    
    return (
      <div className="container-fluid">
      
        {/* navbar */}
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <button
                  className="btn btn-default navbar-btn navbar-left"
                  onClick={event => {
                    event.preventDefault()
                    this.isPlaying(this.video1) ? this.video1.pauseVideo() : this.video1.playVideo()
                  }}>
                  play video 1
                </button>
              </div>
              <div className="col-sm-4 a-slider">
                <span className="navbar-top-text">audio  </span>
                <Slider 
                  value={this.state.aFade}
                  change={this.aHandleChange}
                  step={this.state.aStep}
                  max={this.state.aMax}
                  min={this.state.aMin}
                />
              </div>
              <div className="col-sm-4 v-slider">
                <Slider 
                  value={this.state.vFade}
                  change={this.vHandleChange}
                  step={this.state.vStep}
                  max={this.state.vMax}
                  min={this.state.vMin}
                />
                <span className="navbar-top-text">  video</span>
              </div>
              <div className="col-sm-2">
                <button
                  className="btn btn-default navbar-btn navbar-right"
                  onClick={event => {
                    event.preventDefault()
                    this.isPlaying(this.video2) ? this.video2.pauseVideo() : this.video2.playVideo()
                  }}>
                  play video 2
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* players */}
        <div className="container-fluid">
          <div className="youtube1">
            <YouTube
              videoId='v5kRrLmGJho'
              opts={options}
              onReady={this.saveVideo1State} // saves the video event 'video1' for later use
              onPlay={this.saveVideo1State} // updates video event
              onPause={this.saveVideo1State}  // updates video event
            />
          </div>
          <div className="youtube2">
            <YouTube
              videoId='LOpRj927vRc'
              opts={options}
              onReady={this.saveVideo2State}
              onPlay={this.saveVideo2State} 
              onPause={this.saveVideo2State}
            />
          </div>
        </div>
        
        {/* footer */}
        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="row">
              <Link to="/" className="navbar-text navbar-left">crossfad.er</Link>
              <span className="navbar-text navbar-right">built by <Link to="http://github.com/isar0se">r0se</Link> in 4 days in 2017 for <Link to="http://gracehopper.com">grace hopper academy</Link>
              </span>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default App
