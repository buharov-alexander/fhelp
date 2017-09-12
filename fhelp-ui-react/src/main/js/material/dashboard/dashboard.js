'use strict';

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import AccountPie from '../../chart/accountPie';
import AccountTimeChart from '../../chart/accountTimeChart';

class Dashboard extends Component {
    render() {
        return (
            <div>
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
                <div>
                    <Paper className="paper contentColumn" style={{width: '50%'}} zDepth={2}>
                        <AccountTimeChart />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Dashboard;
