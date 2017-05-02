'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';

class NewAccountPage extends Component {
    render() {
    	return (
        <Paper className="paper" zDepth={2}>
            text
        </Paper>
        );
	}
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: (account) => {dispatch({type: 'ADD_ACCOUNT', payload: account})}
  }
}

export default connect(null, mapDispatchToProps)(NewAccountPage);