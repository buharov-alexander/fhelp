'use strict';

import React, {Component} from 'react';
import AccountTable from './accountTable';
import IndicatorTable from './indicatorTable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Overview extends Component {

    render() {
        return (
        <div>
            <Paper className="indicatorPaper" zDepth={2}>
                <IndicatorTable />
            </Paper>
            <Paper className="accountTablePaper" zDepth={2}>
                <AccountTable />
            </Paper>

            <RaisedButton className="button" label="New" primary={true} />
            <RaisedButton className="button" label="Delete" secondary={true} />
        </div>);
    }
}

export default Overview;