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

function mapStateToProps (state) {
    return {
        accounts: state.data.accounts,
    }
}

export default connect(mapStateToProps)(AccountTable);