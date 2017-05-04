'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AccountTable from './accountTable';
import IndicatorTable from './indicatorTable';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationButton from './navigationButton';

class Overview extends React.PureComponent {

    deleteCurrentAccount() {
        this.props.actions.deleteAccount(this.props.currentAccountId);
    }

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
            <RaisedButton className="button" label="Delete" secondary={true}
                onTouchTap={this.deleteCurrentAccount.bind(this)} disabled={!this.props.currentAccountId}/>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        currentAccountId: state.ui.currentAccountId,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        deleteAccount: (id) => {dispatch({type: 'DELETE_ACCOUNT', payload: id})},
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);