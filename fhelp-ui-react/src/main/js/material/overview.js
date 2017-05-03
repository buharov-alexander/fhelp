'use strict';

import React, {Component} from 'react';
import AccountTable from './accountTable';
import IndicatorTable from './indicatorTable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationButton from './navigationButton';

class Overview extends React.PureComponent {

    render() {
        return (
        <div>
            <Paper className="paper" zDepth={2}>
                <IndicatorTable />
            </Paper>
            <Paper className="paper" zDepth={2}>
                <AccountTable />
            </Paper>

            <NavigationButton className="button" label="New" path="/fhelp/newAccount"/>
            <RaisedButton className="button" label="Delete" secondary={true} />
        </div>);
    }
}

export default Overview;