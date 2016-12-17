import React from 'react'
import NavLink from './NavLink'
import style from '../css/style.css'

export default React.createClass({
  render() {
    return (
      <div>
        <h1 className={style.pageHeader}>Calvin College Women in Computing</h1>
        <ul className={style.headerMenu} role="nav">
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
