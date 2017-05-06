'use strict';

const initialState = {isVisibleNewAccountPanel: false, isDrawerOpened: false};

export default function uiViewReducer(state = initialState, action) {
    if (action.type === 'SET_VISIBILITY_NEW_ACCOUNT_PANEL') {
        return Object.assign({}, state, {isVisibleNewAccountPanel: action.payload});
    } else if (action.type === 'SET_DRAWER_STATE') {
        return Object.assign({}, state, {isDrawerOpened: action.payload});
    } else if (action.type === 'SET_CURRENT_ACCOUNT') {
        return Object.assign({}, state, {currentAccountId: action.payload});
    }

    return state;
}