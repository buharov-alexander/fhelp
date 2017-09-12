'use strict';

const initialState = {monthBalance: []};

export default function statisticReducer(state = initialState, action) {
    if (action.type === 'UPDATE_MONTH_BALANCE_STATISTICS_SUCCESS') {
    	return Object.assign({}, state, {monthBalance: action.payload.monthBalance});
    }

    return state;
}
