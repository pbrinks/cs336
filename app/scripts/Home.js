/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * Home.js renders content for the home page */
import React from 'react';
import style from '../css/style.css'

export default React.createClass({
  render() {
    return <div>
    	<h1>Home</h1>
    	<p>Welcome to Calvin College Women in Computing!</p>
    	<img className={style.imageOne} src="http://i.imgur.com/wlk4WYB.jpg" alt="Computing Leaders"/> <br/>
    	<img className={style.imageTwo} src="http://i.imgur.com/kp20HXl.jpg" alt="Atomic Object Tour One"/>
    	<img className={style.imageTwo} src="http://i.imgur.com/Ys0tR76.jpg" alt="Atomic Object Tour Two"/>
    	</div>
  }
})
