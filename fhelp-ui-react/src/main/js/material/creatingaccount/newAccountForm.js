'use strict';

import React, {Component} from 'react';
import {reduxForm, Field, reset} from 'redux-form';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {SelectField,  TextField} from 'redux-form-material-ui';
import {required, isNumber} from '../util/formValidator';

class NewAccountForm extends Component {

    createAccount(values) {
        const newAccount = {
            name: values.name,
            type: values.type,
            valuta: values.valuta,
            balance: parseFloat(values.balance)
        }
        this.props.actions.addAccount(newAccount);
        this.props.actions.resetForm();
    }

    render() {
        const {handleSubmit, valid} = this.props;
        return (
            <form onSubmit={handleSubmit(this.createAccount.bind(this))}>
                <div>
                    <Field 
                    className="formField"
                    name="name"
                    floatingLabelText="Account name"
                    validate={required}
                    component={TextField}/>
                </div>
                <div>
                    <Field 
                    className="formField"
                    name="type"
                    floatingLabelText="Type"
                    validate={required} 
                    component={SelectField}>
                        <MenuItem value="CASH" primaryText="CASH" />
                        <MenuItem value="BANK_ACCOUNT" primaryText="BANK_ACCOUNT" />
                        <MenuItem value="DEPOSIT" primaryText="DEPOSIT" />
                        <MenuItem value="BROKER_ACCOUNT" primaryText="BROKER_ACCOUNT" />
                        <MenuItem value="OTHER" primaryText="OTHER" />
                    </Field>
                </div>
                <div>
                    <Field 
                    className="formField"
                    name="valuta"
                    floatingLabelText="Valuta"
                    validate={required} 
                    component={SelectField}>
                        <MenuItem value="RUB" primaryText="RUB" />
                        <MenuItem value="USD" primaryText="USD" />
                        <MenuItem value="EUR" primaryText="EUR" />
                    </Field>
                </div>
                <div>
                    <Field 
                    className="formField"
                    name="balance"
                    floatingLabelText="Current balance"
                    validate={[required, isNumber]}
                    component={TextField}/>
                </div>
                <div>
                    <RaisedButton
                    className="button"
                    type="submit"
                    disabled={!valid}
                    label="Create"
                    primary={true}
                    />
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        addAccount: (account) => {dispatch({type: 'ADD_ACCOUNT', payload: account})},
        resetForm: () => {dispatch(reset('NewAccountForm'))}
    }
  }
}

NewAccountForm = connect(null, mapDispatchToProps)(NewAccountForm);
NewAccountForm = reduxForm({form: 'NewAccountForm'})(NewAccountForm);
export default NewAccountForm;