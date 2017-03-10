import React, {Component} from 'react'
import {Link} from 'react-router'
import YouTube from 'react-youtube'
import Slider from 'react-bootstrap-slider'
import $ from 'jquery'

// import Playlist1 from './Playlist1'
// import Playlist2 from './Playlist2'
// import Navbar from './Navbar'
// import Footer from './Footer'
// import Main from './Main'

class App extends Component {
	constructor() {
		super()
		
		this.state = {
			aFade: 100,
			aMin: 0,
			aMax: 200,
			aStep: 1,
			vFade: 50,
			vMin: 0,
			vMax: 100,
			vStep: 1
		}
		this.initializeVideo1 = this.initializeVideo1.bind(this)
		this.initializeVideo2 = this.initializeVideo2.bind(this)
		this.playPauseVideo1 = this.playPauseVideo1.bind(this)
		this.playPauseVideo2 = this.playPauseVideo2.bind(this)
		this.updateVideoInstance1 = this.updateVideoInstance1.bind(this)
		this.updateVideoInstance2 = this.updateVideoInstance2.bind(this)
		this.isPlaying = this.isPlaying.bind(this)
		this.aHandleChange = this.aHandleChange.bind(this)
		this.vHandleChange = this.vHandleChange.bind(this)
	}
	
	initializeVideo1(event) {
		// may want to do some kind of hack to play then pause the vid, to remove yt logo
		this.video1 = event.target
	}
	
	initializeVideo2(event) {
		// may want to do some kind of hack to play then pause the vid, to remove yt logo
		this.video2 = event.target
	}
	
	updateVideoInstance1(event) {
		this.video1 = event.target
	}
	
	updateVideoInstance2(event) {
		this.video2 = event.target
	}
	
	playPauseVideo1(event) {
		event.preventDefault()
		this.isPlaying(this.video1) ? this.video1.pauseVideo() : this.video1.playVideo()
	}
	
	playPauseVideo2(event) {
		event.preventDefault()
		this.isPlaying(this.video2) ? this.video2.pauseVideo() : this.video2.playVideo()
	}
	
	isPlaying(video) {
		return video.getPlayerState() === 1
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
		if (event.target.value < 50) {
			$(document).ready(() => {
				$('.youtube1').css('opacity', 1.0-(event.target.value/100))
				$('.youtube2').css('opacity', event.target.value/100)
			})
		} else if (event.target.value > 50) {
			$(document).ready(() => {
				$('.youtube1').css('opacity', 1.0-(event.target.value/100))
				$('.youtube2').css('opacity', event.target.value/100)
			})
		} else if (event.target.value === 50) {
			$(document).ready(() => {
				$('.youtube1').css('opacity', 0.5)
				$('.youtube2').css('opacity', 0.5)
			})
		}
	}
	
	render() {
		const options = {
			width: window.innerWidth - 30,
			height: window.innerHeight - 140,
			playerVars: {
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
							<div className="col-sm-2">
							
								{/* button1 */}
								<button
									className="btn btn-default navbar-btn navbar-left"
									onClick={this.playPauseVideo1}>
									play video 1
								</button>
							</div>
							<div className="col-sm-4 a-slider">
								<span className="navbar-top-text">audio  </span>
								
								{/* slider1 */}
								<Slider 
									value={this.state.aFade}
									change={this.aHandleChange}
									step={this.state.aStep}
									max={this.state.aMax}
									min={this.state.aMin}
								/>
							</div>
							<div className="col-sm-4 v-slider">
								
								{/* slider2 */}
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
								
								{/* button2 */}
								<button
									className="btn btn-default navbar-btn navbar-right"
									onClick={this.playPauseVideo2}>
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
							onReady={this.initializeVideo1} // saves the video event 'video1' for later use
							onPlay={this.updateVideoInstance1} // updates video event
							onPause={this.updateVideoInstance1}  // updates video event
						/>
					</div>
					<div className="youtube2">
						<YouTube
							videoId='LOpRj927vRc'
							opts={options}
							onReady={this.initializeVideo2}
							onPlay={this.updateVideoInstance2} 
							onPause={this.updateVideoInstance2}
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
