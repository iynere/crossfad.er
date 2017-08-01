import React, {Component} from 'react'
import io from './server'

class Sockets extends Component {
  render() {
    
    const socket = io(location.origin)
    socket.on('connect', () => {
      console.log('connected!')
    })
    
    return (
      <div>
        
      </div>
    );
  }
}

export default Sockets