'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class AccountTable extends Component {
    render() {
        const accounts = this.props.accounts.map(account =>
            <Account key={account.name} account={account}/>
        );

        let total = 0;
        this.props.accounts.forEach(account => {
            total+=account.rubBalance;
        });
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Type</TableHeaderColumn>
                        <TableHeaderColumn>Valuta</TableHeaderColumn>
                        <TableHeaderColumn>Balance</TableHeaderColumn>
                        <TableHeaderColumn>Ruble balance</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {accounts}
                    <TableRow className="boldText" >
                        <TableRowColumn colSpan="3"></TableRowColumn>
                        <TableRowColumn>Total:</TableRowColumn>
                        <TableRowColumn>{total}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

class Account extends Component {
    render() {
        const { account, ...otherProps } = this.props;
        return (
            <TableRow {...otherProps}>
                <TableRowColumn>{account.name}</TableRowColumn>
                <TableRowColumn>{account.type}</TableRowColumn>
                <TableRowColumn>{account.valuta}</TableRowColumn>
                <TableRowColumn>{account.balance}</TableRowColumn>
                <TableRowColumn>{account.rubBalance}</TableRowColumn>
            </TableRow>
        );
    }
}

function mapStateToProps (state) {
    return {
        accounts: state.data.accounts,
    }
}

export default connect(mapStateToProps)(AccountTable);