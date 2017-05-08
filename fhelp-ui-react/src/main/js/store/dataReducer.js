'use strict';

const initialState = {accounts: [], indicators: []};

export default function dataReducer(state = initialState, action) {
    if (action.type === 'ADD_ACCOUNT_SUCCESS') {
        const newAccount = balanceFormat(action.payload, state);
        const newAccounts = state.accounts.concat(newAccount);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === 'DELETE_ACCOUNT_SUCCESS') {
        const newAccounts = state.accounts.filter(account => 
            account.id != action.payload);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === "LOAD_ACCOUNTS") {
        const accounts = action.payload.map(account =>
            balanceFormat(account, state));
        return Object.assign({}, state, {accounts: accounts});
    } else if (action.type === 'LOAD_INDICATORS') {
        return Object.assign({}, state, {indicators: action.payload});
    } else if (action.type === 'UPDATE_ACCOUNT') {
        const updatedAccount = balanceFormat(action.payload, state);
        const newAccounts = state.accounts.map(account => {
            return account.id == updatedAccount.id ? updatedAccount : account;
        });
        return Object.assign({}, state, {accounts: newAccounts});
    }

    return state;
}


function balanceFormat(account, state) {
    const indicatorValue = getIndicatorValue(state, account.valuta) || 1;
    account.rubBalance = Math.round(account.balance*indicatorValue*10)/10;
    account.balance = Math.round(account.balance*10)/10;
    return account;
}

function getIndicatorValue(state, indicatorName) {
    const indicator = state.indicators.find(element => {
        return element.name == indicatorName;
    });
    return indicator ? indicator.value : null;
}