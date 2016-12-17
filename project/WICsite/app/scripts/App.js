import React from 'react'
import NavLink from './NavLink'
import base from '../css/base.css'

export default React.createClass({
  render() {
    return (
      <div>
        <h1 className={base.pageHeader}>Calvin College Women in Computing</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/members">Members</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
