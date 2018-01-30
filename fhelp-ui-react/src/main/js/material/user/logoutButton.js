'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

class LogoutButton extends Component {

    render() {
        const {logged, username, actions, ...otherProps} = this.props;
        return logged ?
            <FlatButton {...otherProps}
                className="logoutButton"
                label={username + "|exit"}
                onTouchTap={() => actions.logout()}
            />
            : null
    }
}

LogoutButton.muiName = 'FlatButton';

function mapStateToProps (state) {
    return {
        username: state.user.username,
        logged: state.user.logged
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        logout: () => {dispatch({type: 'LOGOUT_USER'})}
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
