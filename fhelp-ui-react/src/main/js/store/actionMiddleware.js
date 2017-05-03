'use strict';

import client from '../api/client';

export default store => next => action => {
    console.log('In middleware', action);
    if (action.type === 'ADD_ACCOUNT') {
        client({method: 'POST',
            path: 'http://localhost:8080/fhelp/data/accounts', 
            entity: action.payload, 
            headers: {'Content-Type': 'application/json'}});
    }
    return next(action);
}