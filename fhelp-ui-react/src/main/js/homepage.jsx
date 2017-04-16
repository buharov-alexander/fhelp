'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Content from './bootstrap/content';
import {configureStore, loadData} from './store/store.js';

const store = configureStore();
loadData(store);

class HomePage extends Component {
    render() {
        return (
            <Provider store={store}>
                <Content />
            </Provider>
        );
    }
}

ReactDOM.render(
    <HomePage />,
    document.getElementById('react')
);

