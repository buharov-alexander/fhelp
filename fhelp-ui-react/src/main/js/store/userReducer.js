'use strict';

const initialState = {username: '', logged: false};

export default function userReducer(state = initialState, action) {
    if (action.type === 'LOGIN_SUCCESS') {
    	return Object.assign({}, state, {username: action.payload.username, logged: true});
    }

    return state;
}