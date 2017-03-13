import React from 'react'
import {MenuItem} from 'react-bootstrap'

const MenuItems = props => {
  let queue = props.queue
  
  return (
    <div>
      {queue.map((item, idx) => (
        <MenuItem
          key={idx}
          eventKey={item.id}
          onSelect={(key, event) => {
            console.log('EVENT?', event)
            console.log('EVENTKEY?', eventKey)
          }}>
          {`${queue.reverse().indexOf(item)}. ${item.title}`}
        </MenuItem>   
      ))}
    </div>
  )
}

export default MenuItems