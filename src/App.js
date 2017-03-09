import React, {Component} from 'react'
import {Link} from 'react-router'
import YouTube from 'react-youtube'
// import Playlist1 from './Playlist1'
// import Playlist2 from './Playlist2'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import Main from './Main'

class App extends Component {
  constructor(props) {
    super(props)
    this.onReadyPlayer1 = this.onReadyPlayer1.bind(this)
    this.onReadyPlayer2 = this.onReadyPlayer2.bind(this)
  }
  
  onReadyPlayer1(event) {
    this.video1 = event.target
  }
  
  onReadyPlayer2(event) {
    this.video2 = event.target
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
            <button
              className="btn btn-default navbar-btn navbar-left"
              onClick={event => {
                event.preventDefault()
                this.video1.getPlayerState() === 1 ? this.video1.pauseVideo() : this.video1.playVideo()
              }}>
              play video 1
            </button>
            <button
              className="btn btn-default navbar-btn navbar-right"
              onClick={event => {
                event.preventDefault()
                this.video2.getPlayerState() === 1 ? this.video2.pauseVideo() : this.video2.playVideo()
              }}>
              play video 2
            </button>
          </div>
        </nav>
        
        {/* players */}
        <div className="container-fluid">
          <div className="youtube1" ref='youtube1' onClick={event => {
            console.log('clicked')
          }}>
            <YouTube
              videoId='v5kRrLmGJho'
              opts={options}
              onReady={this.onReadyPlayer1} // saves the video event 'video1' for later use
            />
          </div>
          <div className="youtube2" ref='youtube2'>
            <YouTube
              videoId='LOpRj927vRc'
              opts={options}
              onReady={this.onReadyPlayer2} // // saves the video event 'video2' for later use
            />
          </div>
        </div>
        
        {/* footer */}
        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <Link to="/" className="navbar-text navbar-left">crossfad.er</Link>
            <span className="navbar-text navbar-right">built by <Link to="http://github.com/isar0se">r0se</Link> in 4 days in 2017 for <Link to="http://gracehopper.com">grace hopper academy</Link>
            </span>
          </div>
        </nav>
      </div>
    )
  }
}

export default App
