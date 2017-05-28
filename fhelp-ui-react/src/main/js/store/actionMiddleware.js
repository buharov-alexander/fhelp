'use strict';

import client from '../api/client';

export default store => next => action => {
    console.log(action);
    if (action.type === 'ADD_ACCOUNT') {
        const newAccount = action.payload;
        client({method: 'POST',
            path: '/fhelp/account', 
            entity: newAccount, 
            headers: {'Content-Type': 'application/json'}}).then(response => {
                newAccount.id = response.entity.id;
                store.dispatch({type: 'ADD_ACCOUNT_SUCCESS', payload: newAccount});
            });
    } else if (action.type === 'DELETE_ACCOUNT') {
        client({method: 'DELETE',
            path: '/fhelp/data/accounts/' + action.payload}).then(response => {
                store.dispatch({type: 'DELETE_ACCOUNT_SUCCESS', payload: action.payload});
            }); 
    } else if (action.type === 'ADD_ACCOUNT_STATE') {
        const state = action.payload;
        client({method: 'POST',
            path: '/fhelp/account/state', 
            entity: state, 
            headers: {'Content-Type': 'application/json'}}).then(response => {
                store.dispatch({type: 'ADD_ACCOUNT_STATE_SUCCESS', payload: response.entity});
                return client({method: 'GET', path: '/fhelp/account/accountWithStates/' + state.accountId});
                    }).then(response => {
                        store.dispatch({ type: "UPDATE_ACCOUNT_SUCCESS", payload: response.entity});
        });
    } else if (action.type === 'LOAD_ACCOUNTS') {
        client({method: 'GET', path: '/fhelp/rbc/indicators'}).then(response => {
            const indicators = response.entity;
            store.dispatch({ type: "LOAD_INDICATORS_SUCCESS", payload: indicators});
            return client({method: 'GET', path: '/fhelp/account'});
        }).then(response => {
            store.dispatch({ type: "LOAD_ACCOUNTS_SUCCESS", payload: response.entity});
        });
    } else if (action.type === 'LOAD_ACCOUNT_STATES') {
        const accountId = action.payload;
        client({method: 'GET', path: '/fhelp/account/stateList/' + accountId}).then(response => {
            store.dispatch({ type: "LOAD_ACCOUNT_STATES_SUCCESS", payload: {accountId: accountId, states: response.entity}});
        });
    }

    return next(action);
}