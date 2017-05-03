'use strict';

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

class NavigationButton extends Component {

    render() {
    	const path = this.props.path;
    	const label = this.props.label;
    	const className = this.props.className;

        return (
            <RaisedButton className={className} label={label} primary={true} onTouchTap={() => this.props.actions.goTo(path)}/>
		);
    }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
        goTo: (path) => {dispatch(push(path))}
    }
  }
}

export default connect(null, mapDispatchToProps)(NavigationButton);