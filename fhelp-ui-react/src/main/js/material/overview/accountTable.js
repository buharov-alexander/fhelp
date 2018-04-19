'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class AccountTable extends Component {

    
    handleSelect(indexes) {
        const accountId = indexes.length ? this.props.accounts[indexes[0]].id : undefined;
        this.props.actions.setCurrentAccount(accountId);
    }

    componentWillUnmount() {
        this.props.actions.setCurrentAccount(undefined);   
    }

    render() {
        const accounts = this.props.accounts.map(account =>
            <Account key={account.id} account={account}/>
        );

        let total = 0;
        this.props.accounts.forEach(account => {
            total+=account.rubBalance;
        });
        total = Math.round(total*10)/10;
        return (
            <Table onRowSelection={this.handleSelect.bind(this)}>
                <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn tooltip="Account name">Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Account type">Type</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Valuta">Valuta</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Current balance">Balance</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Current balance in rubles">Ruble balance</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} stripedRows={true}>
                    {accounts}
                </TableBody>
                <TableFooter>
                    <TableRow className="boldText" selectable={false} style={{verticalAlign: 'middle'}}>
                        <TableRowColumn colSpan="3"></TableRowColumn>
                        <TableRowColumn>Total:</TableRowColumn>
                        <TableRowColumn>{total}</TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

class Account extends Component {
    render() {
        const { account, ...otherProps } = this.props;
        return (
            <TableRow {...otherProps}>
                {otherProps.children[0]}
                <TableRowColumn>{account.name}</TableRowColumn>
                <TableRowColumn>{account.type}</TableRowColumn>
                <TableRowColumn>{account.valuta}</TableRowColumn>
                <TableRowColumn>{account.balance}</TableRowColumn>
                <TableRowColumn>{account.rubBalance}</TableRowColumn>
            </TableRow>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.data.accounts
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        setCurrentAccount: (account) => {dispatch({type: 'SET_CURRENT_ACCOUNT', payload: account})},
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);