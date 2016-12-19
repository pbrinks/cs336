/* Authors: Paige Brinks (plb7), Lydia Cupery (lac26)
 * Date: December 19, 2016
 *
 * About.js renders content for the about page */
import React from 'react';
import style from '../css/style.css';

export default React.createClass({
  render() {
    return <div>
	    <h1>Our Mission</h1>
	    <p >We aim to increase retention, competence, and confidence of women in technology at 
		    Calvin College by creating a sense of belonging in community and providing opportunities 
		    to further develop technical skills. Some of the things we do as a club are: set up a mentorship 
		    program for our members, tour local comapnies, homework nights in the lab, workshops, attend women in 
		    tech events and conferences. 
		</p>

	    <h1>Our Leadership</h1>
	    <div className={style.leadershipName}>Paige Brinks</div>
	    <div className={style.leadershipRole}>President</div>
	    <div className={style.leadershipDesc}>I'm in my last semester at Calvin, studying Computer Science and German. 
	    	I am currently interning at Priority Health on the Development Support team and 
			 I'm an instructor for Girls Who Code on Tuesday nights. After I graduate I am interested in working 
			 in a global company with ties in the USA and Germany. </div>
		<div className={style.leadershipEmail}>plb7@students.calvin.edu</div>

	    <div className={style.leadershipName}>Lydia Cupery</div>
	    <div className={style.leadershipRole}>Vice President</div>
	    <div className={style.leadershipDesc}>I am a senior with a major in Computer Science and a minor in Business.  
	    I am currently interning as a software developer at CQL 
	    	doing web development.  After I graduate, I will be combining my interests in computer science and business and 
	    	work as a software consultant at Atomic Object.</div>
	    <div className={style.leadershipEmail}>lac26@students.calvin.edu</div>

		<div className={style.leadershipName}>Beka Agava</div>
	    <div className={style.leadershipRole}>Finance Chair</div>
	    <div className={style.leadershipDesc}>I'm in my last semester at Calvin College, studying Computer Science and Economics. 
	    I am currently interning on the development team at a start-up, Eidex. 
	    I am also a facilitator for one of the Girls Who Code sessions held at Calvin College. After I graduate, 
	    I hope to find a job that integrates technology and economics/finance.</div>
	    <div className={style.leadershipEmail}>baa8@students.calvin.edu</div>
    </div>
  }
})