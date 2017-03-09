import React from 'react'
import {Link} from 'react-router'

const Footer = () => (
  <nav className="navbar navbar-default navbar-fixed-bottom">
    <div className="container-fluid">
      <Link to="/" className="navbar-text navbar-left">crossfad.er</Link>
      <span className="navbar-text navbar-right">built by <Link to="http://github.com/isar0se">r0se</Link> in 4 days in 2017 for <Link to="http://gracehopper.com">grace hopper academy</Link>
      </span>
    </div>
  </nav>
)

export default Footer