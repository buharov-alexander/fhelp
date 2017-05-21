'use strict';

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import AccountPie from '../../chart/accountPie';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Paper className="paper contentColumn" style={{width: '30%'}} zDepth={2}>
                    <AccountPie propertyForGrouping={account => account.name} />
                </Paper>
                <Paper className="paper contentColumn" style={{width: '30%'}} zDepth={2}>
                    <AccountPie propertyForGrouping={account => account.type} />
                </Paper>
                <Paper className="paper contentColumn" style={{width: '30%'}} zDepth={2}>
                    <AccountPie propertyForGrouping={account => account.valuta} />
                </Paper>
            </div>
        );
    }
}

export default Dashboard;