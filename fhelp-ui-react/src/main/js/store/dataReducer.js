'use strict';

const initialState = {accounts: [], indicators: [], accountStates: {}};

export default function dataReducer(state = initialState, action) {
    if (action.type === 'ADD_ACCOUNT_SUCCESS') {
        const newAccount = balanceFormat(action.payload, state);
        const newAccounts = state.accounts.concat(newAccount);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === 'DELETE_ACCOUNT_SUCCESS') {
        const newAccounts = state.accounts.filter(account => 
            account.id != action.payload);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === "LOAD_ACCOUNTS_SUCCESS") {
        const accounts = action.payload.map(account =>
            balanceFormat(account, state));
        return Object.assign({}, state, {accounts: accounts});
    } else if (action.type === 'LOAD_INDICATORS_SUCCESS') {
        return Object.assign({}, state, {indicators: action.payload});
    } else if (action.type === 'UPDATE_ACCOUNT_SUCCESS') {
        let {states, ...updatedAccount} = action.payload;
        updatedAccount = balanceFormat(updatedAccount, state);
        const accountStates = Object.assign({}, state.accountStates);
        accountStates[updatedAccount.id] = states;

        const newAccounts = state.accounts.map(account => {
            return account.id == updatedAccount.id ? updatedAccount : account;
        });
        const newState = Object.assign({}, state, {accounts: newAccounts}, {accountStates: accountStates});
        return newState
    } else if (action.type === 'LOAD_ACCOUNT_STATES_SUCCESS') {
        const newState = {};
        newState[action.payload.accountId] = action.payload.states;
        const accountStates = Object.assign({}, state.accountStates, newState);
        return Object.assign({}, state, {accountStates: accountStates});
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