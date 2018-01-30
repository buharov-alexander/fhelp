'use strict';

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import AccountChooser from './accountChooser';
import AccountInfo from './accountInfo';

class AccountDetailsPage extends Component {
    render() {
        return (
        <div>
            <div className="contentColumn" style={{width: '20%'}}>
                <Paper className="paper" zDepth={2}>
                    <AccountChooser />
                </Paper>
            </div>
            <div className="contentColumn" style={{width: '80%'}}>
                <Paper className="paper" zDepth={2}>
                    <AccountInfo />
                </Paper>
            </div>
        </div>
        );
    }
}

export default AccountDetailsPage;