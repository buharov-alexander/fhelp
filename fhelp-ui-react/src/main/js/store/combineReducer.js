'use strict';

import { combineReducers } from 'redux';
import uiViewReducer from './uiViewReducer';
import dataReducer from './dataReducer';

export default combineReducers({
    ui: uiViewReducer,
    data: dataReducer
});