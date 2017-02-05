'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

var AccountTable = React.createClass({
    getInitialState: function () {
        return ({accounts: []});
    },
    componentDidMount: function () {
        client({method: 'GET', path: '/fhelp/data/accounts'}).done(response => {
            this.setState({accounts: response.entity._embedded.accounts});
        });
    },
    render: function () {
        return (
            <AccountList accounts={this.state.accounts}/>
        )
    }
})

class AccountList extends React.Component{
    render() {
        var accounts = this.props.accounts.map(account =>
            <Account key={account._links.self.href} account={account}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Valuta</th>
                    <th>Balance</th>
                </tr>
                {accounts}
                </tbody>
            </table>
        )
    }
}

class Account extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.account.name}</td>
                <td>{this.props.account.type}</td>
                <td>{this.props.account.valuta}</td>
                <td>{this.props.account.balance}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <AccountTable />,
    document.getElementById('react')
)