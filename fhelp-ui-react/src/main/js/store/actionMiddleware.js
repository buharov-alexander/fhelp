'use strict';

import client from '../api/client';

export default store => next => action => {
	console.log(action);
    if (action.type === 'ADD_ACCOUNT') {
        client({method: 'POST',
            path: 'http://localhost:8080/fhelp/account', 
            entity: action.payload, 
            headers: {'Content-Type': 'application/json'}}).then(response => {
            	store.dispatch({type: 'ADD_ACCOUNT_SUCCESS', payload: response.entity});
            });
    } else if (action.type === 'DELETE_ACCOUNT') {
        client({method: 'DELETE',
            path: 'http://localhost:8080/fhelp/data/accounts/' + action.payload}).then(response => {
            	store.dispatch({type: 'DELETE_ACCOUNT_SUCCESS', payload: action.payload});
            }); 
    } else if (action.type === 'ADD_ACCOUNT_STATE') {
        client({method: 'POST',
            path: 'http://localhost:8080/fhelp/account/state', 
            entity: action.payload, 
            headers: {'Content-Type': 'application/json'}}).then(response => {
                store.dispatch({type: 'ADD_ACCOUNT_STATE_SUCCESS', payload: response.entity});
            });
    }
    return next(action);
}