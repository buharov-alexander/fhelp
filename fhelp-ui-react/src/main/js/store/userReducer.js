'use strict';

const initialState = {user: ''};

export default function userReducer(state = initialState, action) {
    if (action.type === 'LOGIN_SUCCESS') {
    	return Object.assign({}, state, action.payload);
    }

    return state;
}