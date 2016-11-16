/* Paige Brinks, plb7
 * Oct. 24, 2016
 *
 * CS 336, Lab 08 - Excercise 8.1: ReactJS tutorial
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import '../css/base.css';

import CommentBox from './commentBox';


ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

