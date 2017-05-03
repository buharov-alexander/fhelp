'use strict';

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import NewAccountForm from './newAccountForm';

class NewAccountPage extends Component {
    render() {
        return (
        <Paper className="paper" zDepth={2}>
            <NewAccountForm />
        </Paper>
        );
    }
}

export default NewAccountPage;