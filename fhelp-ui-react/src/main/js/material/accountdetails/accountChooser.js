'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem, makeSelectable} from 'material-ui/List';

let SelectableList = makeSelectable(List);

class AccountTable extends Component {
    
    handleSelect(event, id) {
        this.props.actions.setCurrentAccount(id);
        if (id) {
            this.props.actions.loadAccountStates(id);
        }
    }

    componentDidMount() {
        if (!this.props.currentAccountId && this.props.accounts.length > 0) {
			const firstAccountId = this.props.accounts[0].id;
			this.handleSelect(null, firstAccountId);
        }
        this.props.actions.loadAccount();
    }

    componentWillUnmount() {
        this.props.actions.setCurrentAccount(undefined);   
    }

    render() {
        const accounts = this.props.accounts.map(account =>
            <ListItem key={account.id} value={account.id}>
                {account.name}
            </ListItem>
        );

        return (
            <SelectableList value={this.props.currentAccountId} onChange={this.handleSelect.bind(this)}>
                {accounts}
            </SelectableList>
        )
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.data.accounts,
        currentAccountId: state.ui.currentAccountId
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        setCurrentAccount: (account) => {dispatch({type: 'SET_CURRENT_ACCOUNT', payload: account});},
        loadAccount: () => {dispatch({type: 'LOAD_ACCOUNTS'});},
        loadAccountStates: (accountId) => {dispatch({type: 'LOAD_ACCOUNT_STATES', payload: accountId});}
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);