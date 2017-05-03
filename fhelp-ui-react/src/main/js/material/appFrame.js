'use strict';

import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Overview from './overview';
import NewAccountPage from './newAccountPage';
import {withRouter} from 'react-router-dom';


class AppFrame extends Component {

    changeDrawerState() {
        this.props.actions.setDrawerOpened(!this.props.isDrawerOpened);
    }

    chooseSection(path) {
        this.props.actions.goTo(path);
        this.props.actions.setDrawerOpened(false);
    }

    render() {
        return (
            <div>
                <AppBar title="Financial helper" onLeftIconButtonTouchTap={() => this.changeDrawerState()} />
                <Drawer Drawer docked={false} open={this.props.isDrawerOpened} onRequestChange={(open) => this.props.actions.setDrawerOpened(open)} >
                    <MenuItem onTouchTap={() => this.chooseSection("/fhelp/home")}>
                        Overview
                    </MenuItem>
                    <MenuItem onTouchTap={() => this.chooseSection("/fhelp/newAccount")}>
                        Create account
                    </MenuItem>
                </Drawer>
                <Route exact path="/fhelp/home" component={Overview} />
                <Route exact path="/fhelp/newAccount" component={NewAccountPage} />

                <link rel="stylesheet" href="../material.css" />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        isDrawerOpened: state.ui.isDrawerOpened
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        setDrawerOpened: (isDrawerOpened) => {dispatch({type: 'SET_DRAWER_STATE', payload: isDrawerOpened})},
        goTo: (path) => {dispatch(push(path))}
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppFrame));