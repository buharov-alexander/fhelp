'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, Button} from 'react-bootstrap';
import NewAccountForm from './newAccountForm'

class NewAccountPanel extends Component {
    
    changePanelVisibility() {
        this.props.setPanelVisibility(!this.props.isVisiblePanel);
    }

    render () {
        return (
            <div>
                <Button bsStyle="success" onClick={this.changePanelVisibility.bind(this)}>
                    New Account
                </Button>
                <Panel collapsible expanded={this.props.isVisiblePanel}>
                    <NewAccountForm />
                </Panel>
            </div>);
    }
}

function mapStateToProps (state) {
    return {
        isVisiblePanel: state.isVisibleNewAccountPanel
    }
}

function mapDispatchToProps(dispatch) {
  return {
    setPanelVisibility: (isVisiblePanel) => {dispatch({type: 'SET_VISIBILITY_NEW_ACCOUNT_PANEL', payload: isVisiblePanel})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAccountPanel);