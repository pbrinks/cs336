import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import EventBox from './eventBox';
import EventEdit from './eventEdit';
import EventList from './eventList';
import App from './App.js';
import Home from './Home.js';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
         <IndexRoute component={Home}/>
        <Route path="/about" component={EventEdit} />
        <Route path="/repos" component={EventBox} />
        </Route>
    </Router>
), document.getElementById('content')
);
