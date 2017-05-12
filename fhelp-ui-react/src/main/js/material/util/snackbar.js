'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class NotificationComponent extends Component {
    
    handleRequestClose() {
        this.props.actions.closeSnackbar();
    }

    render() {
        return (
            <Snackbar
                open={this.props.snackbarOpen}
                message={this.props.snackbarMessage}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose.bind(this)}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        snackbarOpen: state.ui.snackbarOpen,
        snackbarMessage: state.ui.snackbarMessage
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        closeSnackbar: () => {dispatch({type: 'SET_SNACKBAR_STATE', payload: {open: false, message: ''}})},
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
