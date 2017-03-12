'use strict';

import {createStore} from 'redux';
import client from './client';

function configureStore() {
    const store = createStore(storeReducer, {accounts: [], rates: {}});
    return store;
}

function storeReducer(state = [], action) {
    if (action.type === "LOAD_DATA") {
        return action.payload;
    }
    return state;
}

function loadData(store) {
    var data = {};
    client({method: 'GET', path: '/fhelp/mmvb/rates'}).then(response => {
            data.rates = response.entity;
            return client({method: 'GET', path: '/fhelp/data/accounts'});
        }).then(response => {
            var accounts = response.entity._embedded.accounts.map(account =>
                calculateRubleEquivalent(account, data.rates));
            data.accounts = accounts;
            store.dispatch({ type: "LOAD_DATA", payload: data});
        });
}

function calculateRubleEquivalent(account, rates) {
    switch(account.valuta) {
        case 'USD':
            account.rubBalance = account.balance*rates.USD;
            break;
        case 'EUR':
            account.rubBalance = account.balance*rates.EUR;
            break;
        default:
            account.rubBalance = account.balance;
    }
    return account;
}

export {configureStore, loadData};
