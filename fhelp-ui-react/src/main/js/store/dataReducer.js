'use strict';

const initialState = {accounts: [], rates: {}, indicators: []};

export default function dataReducer(state = initialState, action) {
	if (action.type === 'ADD_ACCOUNT') {
        const newAccount = calculateRubleEquivalent(action.payload, state.rates);
        const newAccounts = state.accounts.concat(newAccount);
        return Object.assign({}, state, {accounts: newAccounts});
    } else if (action.type === "LOAD_DATA") {
        return Object.assign({}, state, action.payload);
    } else if (action.type === 'LOAD_INDICATORS') {
        return Object.assign({}, state, {indicators: action.payload});
    }

    return state;
}