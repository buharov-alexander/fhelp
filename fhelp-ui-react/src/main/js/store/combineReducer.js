'use strict';

import {combineReducers} from 'redux';
import uiViewReducer from './uiViewReducer';
import dataReducer from './dataReducer';
import userReducer from './userReducer';
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    ui: uiViewReducer,
    data: dataReducer,
    router: routerReducer,
    form: formReducer,
    user: userReducer
});