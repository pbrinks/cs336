import $ from 'jquery';
import { createStore } from 'redux';

import { API_URL, POLL_INTERVAL } from './global';

let StoreTools = {
    // TODO - Useful utility functions for the state representation
}

let ActionTools = {
    addComment: function(comment) {
    return {
        type: 'ADD_COMMENT',
        comment: comment
        };
    },
    editComment: function(id, comment) {
        return {
            type: 'EDIT_COMMENT',
            id: id,
            comment: comment
        };
    },
    deleteComment: function(id) {
    	return {
    		type: 'DELETE_COMMENT',
    		id: id
    	}

    }
}

let Reducers = {
	addComment: function(action) {

	},
	editComment: function(action) {

	},
	deleteComment: function(action) {

	}
}

function commentsApp(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            Reducers.addComment(action);
            return state;
        case 'EDIT_COMMENT':
            Reducers.editComment(action);
            return state;
        case 'DELETE_COMMENT':
        	return state;
        default:
            return state;
    }
}

let defaultState = {
    data: []
};

let store = createStore(commentsApp, defaultState);

module.exports = { StoreTools, ActionTools, store }