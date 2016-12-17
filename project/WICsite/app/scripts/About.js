import React from 'react';
import style from '../css/style.css';

export default React.createClass({
  render() {
    return <div>
	    <h1>Our Mission</h1>
	    <p>We aim to increase retention, competence, and confidence of women in technology at 
	    Calvin College by creating a sense of belonging in community and providing opportunities 
	    to further develop technical skills.</p>

	    <h1>Our Leadership</h1>
	    <div className={style.leadershipName}>Paige Brinks</div>
	    <div className={style.leadershipRole}>President</div>
	    <div className={style.leadershipDesc}>I am a senior at Calvin studying CS and German. blah blah blah</div>

    </div>
  }
})
