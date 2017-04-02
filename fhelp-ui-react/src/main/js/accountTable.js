'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';

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
            <Table id="borderless" striped bordered condensed hover>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Valuta</th>
                        <th>Balance</th>
                        <th>Ruble balance</th>
                    </tr>
                    {accounts}
                </tbody>
                <tfoot>
                    <tr>
                        <td id="borderless" colSpan="3"></td>
                        <th>Total:</th>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </Table>
        );
    }
}

class Account extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.type}</td>
                <td>{this.props.account.valuta}</td>
                <td>{this.props.account.balance}</td>
                <td>{this.props.account.rubBalance}</td>
            </tr>
        );
    }
}

function mapStateToProps (state) {
    return {
        accounts: state.accounts,
    }
}

export default connect(mapStateToProps)(AccountTable);