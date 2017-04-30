'use strict';

import React, {Component} from 'react';
import Overview from './overview';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class AppFrame extends Component {

    render() {
        return (
        <Router >
            <div>
            <Route exact path="/fhelp/home" component={Overview} />
            </div>
        </Router>
        );
    }
}

export default AppFrame;