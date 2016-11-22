/* Paige Brinks, plb7
 * Nov. 21, 2016
 *
 * CS 336, Lab 12 
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import '../css/base.css';
import CommentBox from './commentBox';
import CommentEdit from './commentEdit';


ReactDOM.render((
    <Router history={browserHistory}>
	  	<Route path="/" component={CommentBox}/>
        <Route path="/:id" component={CommentEdit} />
    </Router>

  ), document.getElementById('content')
);

