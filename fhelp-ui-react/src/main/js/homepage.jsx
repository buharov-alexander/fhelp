'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Content from './material/content';
import {configureStore, history} from './store/store.js';
import { ConnectedRouter } from 'react-router-redux';

const store = configureStore();

class HomePage extends Component {
    render() {
        return (
            <Provider store={store}>
            	<ConnectedRouter history={history}>
                	<Content />
                </ConnectedRouter>
            </Provider>	
        );
    }
}

ReactDOM.render(
    <HomePage />,
    document.getElementById('react')
);

