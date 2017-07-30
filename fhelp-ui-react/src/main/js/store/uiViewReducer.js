'use strict';

const initialState = {isVisibleNewAccountPanel: false, isDrawerOpened: false,
	snackbarOpen: false, snackbarMessage: '', showMenuIcon: true};

export default function uiViewReducer(state = initialState, action) {
    if (action.type === 'SET_VISIBILITY_NEW_ACCOUNT_PANEL') {
        return Object.assign({}, state, {isVisibleNewAccountPanel: action.payload});
    } else if (action.type === 'SET_DRAWER_STATE') {
        return Object.assign({}, state, {isDrawerOpened: action.payload});
    } else if (action.type === 'SET_CURRENT_ACCOUNT') {
        return Object.assign({}, state, {currentAccountId: action.payload});
    } else if (action.type === 'ADD_ACCOUNT_SUCCESS') {
        return Object.assign({}, state, {snackbarOpen: true, snackbarMessage: 'Account was created successfully'});
    } else if (action.type === 'DELETE_ACCOUNT_SUCCESS') {
        return Object.assign({}, state, {snackbarOpen: true, snackbarMessage: 'Account was deleted successfully'});
    } else if (action.type === 'UPDATE_ACCOUNT_SUCCESS') {
        return Object.assign({}, state, {snackbarOpen: true, snackbarMessage: 'Account was updated successfully'});
    } else if (action.type === 'SET_SNACKBAR_STATE') {
        return Object.assign({}, state, {snackbarOpen: action.payload.open, snackbarMessage: action.payload.message});
    } else if (action.type === '@@router/LOCATION_CHANGE') {
        const showMenuIcon = !(action.payload.pathname === '/login')
        return Object.assign({}, state, {showMenuIcon: showMenuIcon});
    }

    return state;
}