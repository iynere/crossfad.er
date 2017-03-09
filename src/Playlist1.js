import React from 'react'
import YouTube from 'react-youtube'
// eventually replace with:
// import YouTube from './YouTube'

const Playlist = props => {
  const options = {
    width: window.innerWidth - 30,
    height: window.innerHeight - 140,
    playerVars: {
      cc_load_policy: 0,
      enablejsapi: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0
      // disable controls somehow
    }
  }
  
    return (
    <div className="youtube1">
        <YouTube
          videoId={props.id}
          opts={options}
        />
    </div>
  )
}

export default Playlist
