'use strict';

import { combineReducers } from 'redux';
import uiViewReducer from './uiViewReducer';
import dataReducer from './dataReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    ui: uiViewReducer,
    data: dataReducer,
    router: routerReducer
});