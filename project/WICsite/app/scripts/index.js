import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import EventBox from './eventBox';
import EventEdit from './eventEdit';
import EventList from './eventList';
import MemberBox from './memberBox';
import MemberEdit from './memberEdit';
import MemberList from './memberList';
import App from './App.js';
import Home from './Home.js';
import About from './About.js';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
         	<IndexRoute component={Home}/>
        	<Route path="/about" component={About} />
        	<Route path="/events" component={EventBox} />
        	<Route path="/events/:id" component={EventEdit} />	
        	<Route path="/members" component={MemberBox} />
        	<Route path="/members/:id" component={MemberEdit} />	
        </Route>
    </Router>
), document.getElementById('content'));
