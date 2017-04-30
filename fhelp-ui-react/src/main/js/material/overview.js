'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AccountTable from './accountTable';
import IndicatorTable from './indicatorTable';
import Paper from 'material-ui/Paper';


class Overview extends Component {

    changeDrawerState() {
        this.props.setDrawerOpened(!this.props.isDrawerOpened);
    }

    render() {
        return (
        <div>
            <AppBar title="Financial helper" onLeftIconButtonTouchTap={this.changeDrawerState.bind(this)} />
            <Paper className="indicatorPaper" zDepth={2}>
                <IndicatorTable />
            </Paper>
            <Paper className="accountTablePaper" zDepth={2}>
                <AccountTable />
            </Paper>
            <Drawer Drawer docked={false} open={this.props.isDrawerOpened} onRequestChange={(open) => this.props.setDrawerOpened(open)} >
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>

            <link rel="stylesheet" href="../material.css" />
        </div>);
    }
}

function mapStateToProps (state) {
    return {
        isDrawerOpened: state.ui.isDrawerOpened
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setDrawerOpened: (isDrawerOpened) => {dispatch({type: 'SET_DRAWER_STATE', payload: isDrawerOpened})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);