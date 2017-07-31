'use strict';

import client from '../../api/client';
import {push} from 'react-router-redux';

export default store => next => action => {
    console.log(action);
    if (action.type === 'LOGIN_USER') {
        const user = action.payload;
        client({method: 'POST',
            path: '/login',
            entity: user,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                store.dispatch({ type: "LOGIN_SUCCESS", payload: {username: user.username}})
        });
    } else if (action.type === 'LOGIN_SUCCESS') {
        store.dispatch(push("/fhelp/home"));
    }

    return next(action);
}