import React, {Component} from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import Slider from 'react-bootstrap-slider'
import YouTube from 'react-youtube'
import YouTubeSearch from './YouTubeSearch'
import $ from 'jquery'
import {isPlaying} from './utils'

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      // audio slider params
      aFade: 100,
      aMin: 0,
      aMax: 200,
      aStep: 1,
      
      // video slider params
      vFade: 50,
      vMin: 0,
      vMax: 100,
      vStep: 1,
      
      // currently queued videos
      leftQ: [],
      rightQ: [],
      
      // hold status of each video on state
      leftPlaying: false,
      rightPlaying: false
    }
    
    // function bindings
    this.addToLeftPlayer = this.addToLeftPlayer.bind(this)
    this.addToRightPlayer = this.addToRightPlayer.bind(this)
    this.initializeVideo1 = this.initializeVideo1.bind(this)
    this.initializeVideo2 = this.initializeVideo2.bind(this)
    this.playPauseVideo1 = this.playPauseVideo1.bind(this)
    this.playPauseVideo2 = this.playPauseVideo2.bind(this)
    this.updateVideoInstance1 = this.updateVideoInstance1.bind(this)
    this.updateVideoInstance2 = this.updateVideoInstance2.bind(this)
    this.aHandleChange = this.aHandleChange.bind(this)
    this.vHandleChange = this.vHandleChange.bind(this)
    this.skipLeft = this.skipLeft.bind(this)
    this.skipRight = this.skipRight.bind(this)
    this.renderMenuItemsL = this.renderMenuItemsL.bind(this)
    this.renderMenuItemsR = this.renderMenuItemsR.bind(this)
    this.renderPlayPauseL = this.renderPlayPauseL.bind(this)
    this.renderPlayPauseR = this.renderPlayPauseR.bind(this)
  }
  
  addToLeftPlayer(results) {
    if (document.getElementsByClassName('react-typeahead-usertext')[0].value.split(' ').join('').length) { // very ugly test of whether input has text

      let newQ = this.state.leftQ.concat({
        id: results[0].id.videoId,
        title: results[0].snippet.title
      })
      
      this.setState({
        leftQ: newQ
      })
      
      console.log(this.state.leftQ)
    }
  }
  
  addToRightPlayer(results) {
    if (document.getElementsByClassName('react-typeahead-usertext')[1].value.split(' ').join('').length) {
      
      let newQ = this.state.rightQ.concat({
        id: results[0].id.videoId,
        title: results[0].snippet.title
      })

      this.setState({
        rightQ: newQ
      })

      console.log(this.state.rightQ)
    }
  }
  
  initializeVideo1(event) {
    this.video1 = event.target
  }
  
  initializeVideo2(event) {
    this.video2 = event.target
  }
  
  updateVideoInstance1(event) {
    this.video1 = event.target // will run on any player state change so we always have access to updated player information
    if (isPlaying(this.video1)) {
      this.setState({
        leftPlaying: true
      })
    } else {
      this.setState({
        leftPlaying: false
      })
    }
  }
  
  updateVideoInstance2(event) {
    this.video2 = event.target
    if (isPlaying(this.video2)) {
      this.setState({
        rightPlaying: true
      })
    } else {
      this.setState({
        rightPlaying: false
      })
    }
  }
  
  skipLeft(event) {
    event.preventDefault()
    this.video1.pauseVideo()
    let newQ = this.state.leftQ.slice(1)
    this.setState({
      leftQ: newQ
    })
    console.log(this.state.leftQ) // this lags a step behind, but functionality is fine
  }
  
  skipRight(event) {
    event.preventDefault()
    this.video2.pauseVideo()
    let newQ = this.state.rightQ.slice(1)
    this.setState({
      rightQ: newQ
    })
    console.log(this.state.rightQ)
  }
  
  playPauseVideo1(event) {
    event.preventDefault()
    if (isPlaying(this.video1)) {
      this.video1.pauseVideo()
    } else {
      this.video1.playVideo()
    }
  }
  
  playPauseVideo2(event) {
    event.preventDefault()
    if (isPlaying(this.video2)) {
      this.video2.pauseVideo()
    } else {
      this.video2.playVideo()
    }
  }
  
  aHandleChange(event) {
    if (event.target.value < 100) {
      this.video2.setVolume(event.target.value)
    } else if (event.target.value > 100) {
      this.video1.setVolume(200-event.target.value)
    } else if (event.target.value === 100) {
      this.video1.setVolume(100)
      this.video2.setVolume(100)
    }
  }
  
  vHandleChange(event) {
    $(document).ready(() => {
      $('.youtube2').css('opacity', event.target.value/100)
    })
  }
  
  renderPlayPauseL() {
    if (this.state.leftPlaying) {
      return (
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.playPauseVideo1}>
          pause
        </button>
      )
    } else {
      return (
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.playPauseVideo1}>
          play
        </button>
      )
    }
  }
  
  renderPlayPauseR() {
    if (this.state.rightPlaying) {
      return (
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.playPauseVideo2}>
          pause
        </button>
      )
    } else {
      return (
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.playPauseVideo2}>
          play
        </button>
      )
    }
  }
  
  renderMenuItemsL(queue) {
    let itemsForMap = queue,
      items = queue
    
    return (
      <div className="btn-group dropdown-menu">
        {itemsForMap.map((item, idx) => (
          <MenuItem
            key={idx}
            eventKey={item.id}
            onSelect={(eventKey, event) => {
              this.video1.pauseVideo()
              let clickedItem = items.splice(items.length-idx-1)[0]
              items.unshift(clickedItem)
              console.log(items)
              this.setState({
                leftQ: items
              })
            }}>
            {`${items.length-idx-1}. ${items[items.length-idx-1].title}`}
          </MenuItem>   
        ))}
      </div>
    )
  }
  
  renderMenuItemsR(queue) {
    let itemsForMap = queue,
      items = queue
    
    return (
      <div className="btn-group dropdown-menu">
        {itemsForMap.map((item, idx) => (
          <MenuItem
            key={idx}
            eventKey={item.id}
            onSelect={(eventKey, event) => {
              this.video2.pauseVideo()
              let clickedItem = items.splice(items.length-idx-1)[0]
              items.unshift(clickedItem)
              console.log(items)
              this.setState({
                rightQ: items
              })
            }}>
            {`${items.length-idx-1}. ${items[items.length-idx-1].title}`}
          </MenuItem>
        ))}
      </div>
    )
  }
  
  render() {
    
    const options = {
      width: window.innerWidth - 30,
      height: window.innerHeight - 130,
      playerVars: {
        autoplay: 1,
        cc_load_policy: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showInfo: 0
      }
    }
    
    return (
      <div className="container-fluid">
      
        {/* navbar */}
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="row">
              
              {/* buttons1 */}
              <div className="col-sm-2 sm-2-top">
                <div className="btn-group navbar-left" role="group">
                  {this.renderPlayPauseL()}
                  <button
                    type="button"
                    className="btn btn-default navbar-btn"
                    onClick={this.skipLeft}>
                    skip
                  </button>
                </div>
              </div>
              
              {/* slider1 */}
              <div className="col-sm-3">
                <div className="a-slider">
                  <span className="navbar-top-text">a</span>
                  <Slider 
                    value={this.state.aFade}
                    change={this.aHandleChange}
                    step={this.state.aStep}
                    max={this.state.aMax}
                    min={this.state.aMin}
                    tooltip='hide'
                  />
                </div>
              </div>
              
              {/* search */}
              <div className="col-sm-1">
                <div className="vid-search1">
                  <YouTubeSearch
                    apiKey='AIzaSyBOr-nJwESPXBlOSh-4-bf2R-ayOTUFVt4'
                    maxResults='5'
                    placeHolder='<- search'
                    callback={this.addToLeftPlayer} 
                  />
                </div>
              </div>
              
              <div className="col-sm-1">
                <div className="vid-search2">
                  <YouTubeSearch
                    apiKey='AIzaSyBOr-nJwESPXBlOSh-4-bf2R-ayOTUFVt4'
                    maxResults='5'
                    placeHolder='search ->'
                    callback={this.addToRightPlayer} 
                  />
                </div>
              </div>
              
              {/* slider2 */}
              <div className="col-sm-3">
                <div className="v-slider">
                  <Slider 
                    value={this.state.vFade}
                    change={this.vHandleChange}
                    step={this.state.vStep}
                    max={this.state.vMax}
                    min={this.state.vMin}
                    tooltip='hide'
                  />
                  <span className="navbar-top-text">v</span>
                </div>
              </div>
              
              {/* buttons2 */}
              <div className="col-sm-2 sm-2-top">
                <div className="btn-group navbar-right" role="group">
                  <button
                    type="button"
                    className="btn btn-default navbar-btn"
                    onClick={this.skipRight}>
                    skip
                  </button>
                  {this.renderPlayPauseR()}
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* players */}
        <div className="container-fluid">
          <div className="youtube1">
            <YouTube
              videoId={this.state.leftQ.length ? this.state.leftQ[0].id : null}
              opts={options}
              onReady={this.initializeVideo1} // saves the video event 'video1' for later use
              onPlay={this.updateVideoInstance1} // updates video event
              onPause={this.updateVideoInstance1}  // updates video event
              onStateChange={this.updateVideoInstance1}  // updates video event
              onEnd={() => {
                this.setState({
                  leftQ: this.state.leftQ.slice(1)
                })
              }}
            />
          </div>
          <div className="youtube2">
            <YouTube
              videoId={this.state.rightQ.length ? this.state.rightQ[0].id : null}
              opts={options}
              onReady={this.initializeVideo2}
              onPlay={this.updateVideoInstance2} 
              onPause={this.updateVideoInstance2}
              onStateChange={this.updateVideoInstance2}
              onEnd={() => {
                this.setState({
                  rightQ: this.state.rightQ.slice(1)
                })
              }}
            />
          </div>
        </div>
        
        {/* footer */}
        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4">
                <div className="bottom-left">
                  <a href="https://github.com/isar0se/crossfad.er" className="navbar-text navbar-left">crossfad.er</a><div className="navbar-text navbar-left"><i><a href="http://crossfader-screens.tumblr.com">submit screenshots </a></i></div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <button type="button" className="btn btn-default navbar-btn">view sets</button>
                  <DropdownButton
                    className="btn btn-default navbar-btn"
                    dropup noCaret
                    pullRight={true}
                    title={'left queue'}
                    id={'left-queue'}>
                    {this.renderMenuItemsL(this.state.leftQ)}
                  </DropdownButton>
                  <DropdownButton
                    className="btn btn-default navbar-btn"
                    dropup noCaret
                    title={'right queue'}
                    id={'right-queue'}>
                    {this.renderMenuItemsR(this.state.rightQ)}
                  </DropdownButton>
                  <button type="button" className="btn btn-default navbar-btn">save set</button>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="bottom-right">
                  <span className="navbar-text navbar-right">built by <a href="http://github.com/isar0se">r0se</a> in 4 days in 2017 for <a href="http://gracehopper.com">grace hopper academy</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default App
