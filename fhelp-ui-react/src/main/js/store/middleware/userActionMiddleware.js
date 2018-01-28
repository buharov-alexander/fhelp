'use strict';

import client from '../../api/client';
import {push} from 'react-router-redux';

export default store => next => action => {
    if (action.type === 'LOGIN_USER') {
        const user = action.payload;
        client({method: 'POST',
            path: '/login',
            entity: user,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
                const origin = window.location.origin;
                const responseURL = response.raw.responseURL.substring(origin.length)
                if (responseURL == "/login?error=true") {
                    store.dispatch({ type: "LOGIN_FAILURE"})
                } else {
                    store.dispatch({ type: "LOGIN_SUCCESS", payload: {username: user.username}})
                }
                store.dispatch(push(responseURL));
        });
    }

    return next(action);
}
