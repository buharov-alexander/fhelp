'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormControl, Form, FormGroup} from 'react-bootstrap';

class NewAccountForm extends Component {
    
    saveAccount() {
        const newAccount = {
            name: this.name.value,
            type: this.type.value,
            valuta: this.valuta.value,
            balance: parseInt(this.balance.value)
        }
        this.props.addAccount(newAccount);
        this.name.value = '';
        this.balance.value = '';
    }

    render() {
        return (
            <Form inline>
                <FormGroup controlId="formName" >
                    <FormControl placeholder="Name" inputRef={ref => { this.name = ref; }}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formType">
                    <FormControl componentClass="select" inputRef={ref => { this.type = ref; }}>
                        <option value="CASH">CASH</option>
                        <option value="BANK_ACCOUNT">BANK_ACCOUNT</option>
                        <option value="DEPOSIT">DEPOSIT</option>
                        <option value="BROKER_ACCOUNT">BROKER_ACCOUNT</option>
                        <option value="OTHER">OTHER</option>
                    </FormControl>
                </FormGroup>
                {' '}
                <FormGroup controlId="formValuta">
                    <FormControl componentClass="select" inputRef={ref => { this.valuta = ref; }}>
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </FormControl>
                </FormGroup>
                {' '}
                <FormGroup controlId="formBalance">
                    <FormControl placeholder="Balance" inputRef={ref => { this.balance = ref; }}/>
                </FormGroup>
                {' '}
                <Button bsStyle="primary" onClick={ this.saveAccount.bind(this) }>
                    Save
                </Button>
            </Form>)
    }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: (account) => {dispatch({type: 'ADD_ACCOUNT', payload: account})}
  }
}

export default connect(null, mapDispatchToProps)(NewAccountForm);