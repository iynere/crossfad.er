// libs
import React, {Component} from 'react'
import {Link} from 'react-router'
import YouTube from 'react-youtube'
import YouTubeSearch from './YouTubeSearch'
import Slider from 'react-bootstrap-slider'
import store from 'store'
import $ from 'jquery'

// funcs
import {/*isUnstarted,*/ isPlaying/*, isPaused, hasEnded, isLoading, isReady*/} from './utils'

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
			
			// currently loaded videos
			leftUrl: null,
			rightUrl: null,
			
			// will play nxt (need to code this still)
			// queue: {
			//  leftQ: [],
			//  rightQ: []
			// },
			// try local storage
			
			// to be saved to local storage, elsewhere, if usr desires, once i code it in
			set: {
				name: '',
				leftList: [],
				rightList: []
			}
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
		this.setState = this.setState.bind(this)
	}
	
	componentDidMount() {
		window.localStorage.clear() // remember to comment this out for demo
	}
	
	componentDidUpdate() {
		// console.log('VID1', this.video1)
		// console.log('VID2', this.video2)
	}
	
	addToLeftPlayer(results) {
		if (document.getElementsByClassName('react-typeahead-usertext')[0].value.split(' ').join('').length) {
			if (isPlaying(this.video1)) {
				
			// store.set('queueLeft', store['queueLeft'] ? store['queueLeft'].push(results[0].id.videoId) : [results[0].id.videoId])

			} else { // this is working
				console.log(results[0])
				this.setState({
					leftUrl: results[0].id.videoId
				})
			}
		}
	}
	
	addToRightPlayer(results) {
		if (document.getElementsByClassName('react-typeahead-usertext')[0].value.split(' ').join('').length) {
			if (isPlaying(this.video2)) {
				
				// store.set('queueRight', store['queueRight'] ? store['queueRight'].concat(results[0].id.videoId) : [results[0].id.videoId])

			} else { // this is working
				console.log(results[0])
				this.setState({
					rightUrl: results[0].id.videoId
				})
			}
		}
	}
	
	playNextFromQueue1(event) {
		const urlToPlay = store.get('queueLeft'[0])
		store['queueLeft'].shift()
		return () => {
			console.log('we gettin here?')
			this.setState({
				leftUrl: urlToPlay,
			})
		}
	}
	
	playNextFromQueue2(event) {
		console.log(this.state.queue.Q)
		this.setState({
			rightUrl: this.state.queue.rightQ[0],
			queue: {
				leftQ: this.state.queue.leftQ,
				rightQ: this.state.queue.rightQ.slice(1)
			}
		})
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
		this.video1 = event.target // will run on any player state change so we always have access to updated player information
	}
	
	updateVideoInstance2(event) {
		this.video2 = event.target
	}
	
	playPauseVideo1(event) {
		event.preventDefault()
		this.setState({ // don't want to add a song to yr set if u nvr start playing it
			set: {
				leftList: this.state.set.leftList.concat(this.state.leftUrl),
				rightList: this.state.set.rightList
			}
		})
		isPlaying(this.video1) ? this.video1.pauseVideo() : this.video1.playVideo()
	}
	
	playPauseVideo2(event) {
		event.preventDefault()
		this.setState({
			set: {
				leftList: this.state.set.leftList,
				rightList: this.state.set.rightList.concat(this.state.rightUrl)
			}
		})
		isPlaying(this.video2) ? this.video2.pauseVideo() : this.video2.playVideo()
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
		
		if (!store.get('queueLeft')) store.set('queueLeft', []) // for testing, delete these later
		if (!store.get('queueRight'))store.set('queueRight', [])
		
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
							<div className="col-sm-2">
								<div className="btn-group navbar-left" role="group">
									<button
										type="button"
										className="btn btn-default navbar-btn"
										onClick={this.playPauseVideo1}>
										vid 1 p/p
									</button>
									<button
										type="button"
										className="btn btn-default navbar-btn"
										onClick={null /* this.skip (to be written) */}>
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
							<div className="col-sm-2">
								<div className="btn-group navbar-right" role="group">
									<button
										type="button"
										className="btn btn-default navbar-btn"
										onClick={null /* this.skip (to be written) */}>
										skip
									</button>
									<button
										type="button"
										className="btn btn-default navbar-btn"
										onClick={this.playPauseVideo2}>
										vid 2 p/p
									</button>	
								</div>
							</div>
						</div>
					</div>
				</nav>
				
				{/* players */}
				<div className="container-fluid">
					<div className="youtube1">
						<YouTube
							videoId={/*'v5kRrLmGJho'*/ this.state.leftUrl}
							opts={options}
							onReady={this.initializeVideo1} // saves the video event 'video1' for later use
							onPlay={this.updateVideoInstance1} // updates video event
							onPause={this.updateVideoInstance1}  // updates video event
							onStateChange={this.updateVideoInstance1}  // updates video event
							onEnd={this.playNextFromQueue1}
						/>
					</div>
					<div className="youtube2">
						<YouTube
							videoId={/*'LOpRj927vRc'*/ this.state.rightUrl}
							opts={options}
							onReady={this.initializeVideo2}
							onPlay={this.updateVideoInstance2} 
							onPause={this.updateVideoInstance2}
							onStateChange={this.updateVideoInstance2}
							onEnd={this.playNextFromQueue2}
						/>
					</div>
				</div>
				
				{/* footer */}
				<nav className="navbar navbar-default navbar-fixed-bottom">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-5">
								<Link to="https://github.com/isar0se/crossfad.er" className="navbar-text navbar-left">crossfad.er</Link>
							</div>
							<div className="col-sm-3">
								<div className="btn-group" role="group">
									<button type="button" className="btn btn-default navbar-btn">view queue</button>
									<button type="button" className="btn btn-default navbar-btn">view set</button>
									<button type="button" className="btn btn-default navbar-btn">save</button>
								</div>
							</div>
							<div className="col-sm-4">
								<span className="navbar-text navbar-right">built by <Link to="http://github.com/isar0se">r0se</Link> in 3 days in 2017 for <Link to="http://gracehopper.com">grace hopper academy</Link>
								</span>
							</div>
						</div>
					</div>
				</nav>
			</div>
		)
	}
}

export default App
