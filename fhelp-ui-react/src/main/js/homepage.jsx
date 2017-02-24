'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AccountTable from './accountTable';
import AccountPieChart from './accountPieChart';
import ValutesRate from './valutesRate';
import {PageHeader, Grid, Row, Col} from 'react-bootstrap';
import client from './client';

class HomePage extends Component {
    render() {
        return (
            <div className="App">
                <PageHeader>Financial helper <small>Accounts</small></PageHeader>
                <Content />
            </div>
        );
    }
}

var Content = React.createClass({
    getInitialState: function () {
        return ({accounts: [], rates: {}});
    },
    componentDidMount: function () {
        client({method: 'GET', path: '/fhelp/mmvb/rates'}).then(response => {
            this.setState({rates: response.entity});
            return client({method: 'GET', path: '/fhelp/data/accounts'});
        }).then(response => {
            var accounts = response.entity._embedded.accounts.map(account =>
                calculateRubleEquivalent(account, this.state.rates));
            this.setState({accounts: accounts});
        });
    },
    render: function () {
        return (<Grid>
            <Row className="show-grid">
                <Col md={8}>
                    <AccountTable accounts={this.state.accounts}/>
                </Col>
                <Col md={4}>
                    <ValutesRate rates={this.state.rates}/>
                    <AccountPieChart accounts={this.state.accounts}/>
                </Col>
            </Row>
        </Grid>);
    }
});

ReactDOM.render(
    <HomePage />,
    document.getElementById('react')
);

function calculateRubleEquivalent(account, rates) {
    switch(account.valuta) {
        case 'USD':
            account.rubBalance = account.balance*rates.USD;
            break;
        case 'EUR':
            account.rubBalance = account.balance*rates.EUR;
            break;
        default:
            account.rubBalance = account.balance;
    }
    return account;
}