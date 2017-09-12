'use strict';

import client from '../../api/client';

export default store => next => action => {
    console.log(action);
    if (action.type === 'UPDATE_MONTH_BALANCE_STATISTICS') {
        const user = action.payload;
        client({method: 'GET', path: '/fhelp/statistics/monthBalance'}).then(response => {
                store.dispatch({ type: "UPDATE_MONTH_BALANCE_STATISTICS_SUCCESS", payload: {monthBalance: response.entity}})
        });
    }

    return next(action);
}
