import React from 'react'
import {Link} from 'react-router'

const Navbar = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <button
        className="btn btn-default navbar-btn navbar-left"
        onClick={() => {
          console.log('test')
        }}>
        play video 1
      </button>
      <button
        className="btn btn-default navbar-btn navbar-right"
        onClick={() => {
          console.log('test')
        }}>
        play video 2
      </button>
    </div>
  </nav>
)

export default Navbar
