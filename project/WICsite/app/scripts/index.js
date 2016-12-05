import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import EventBox from './eventBox';
import EventEdit from './eventEdit';
import App from './App.js';

import '../css/base.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/:id" component={EventEdit} />
    </Router>
), document.getElementById('content')
);
