'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField, DatePicker} from 'redux-form-material-ui';
import {required, isNumber} from '../util/formValidator';
import Paper from 'material-ui/Paper';

class StateUpdater extends Component {
    
    createNewState(values) {
        const newState = {
            accountId: this.props.currentAccountId,
            date: values.date,
            balance: parseFloat(values.balance)
        }
        this.props.actions.addAccountState(newState);
        this.props.actions.resetForm();
    }

    render() {
        const {handleSubmit, valid} = this.props;
        return (
            <Paper className="paper contentColumn" style={{width: '40%'}}>
                <h2>Add account state</h2>
                <form onSubmit={handleSubmit(this.createNewState.bind(this))}>
                    <div> 
                        <Field 
                        className="formField"
                        name="date"
                        floatingLabelText="Date"
                        maxDate={new Date()}
                        validate={required}
                        format={(value, name) => value === '' ? null : value}
                        component={DatePicker}/>
                    </div>
                    <div>
                        <Field 
                        className="formField"
                        name="balance"
                        floatingLabelText="Balance"
                        validate={required, isNumber}
                        component={TextField}/>
                    </div>
                    <div>
                        <RaisedButton
                        className="button"
                        type="submit"
                        disabled={!valid}
                        label="Add state"
                        primary={true}
                        />
                    </div>            
                </form>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentAccountId: state.ui.currentAccountId
    }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
        addAccountState: (accountState) => {dispatch({type: 'ADD_ACCOUNT_STATE', payload: accountState})},
        resetForm: () => {dispatch(reset('AccountStateForm'))}
    }
  }
}

StateUpdater = connect(mapStateToProps, mapDispatchToProps)(StateUpdater);
StateUpdater = reduxForm({form: 'AccountStateForm'})(StateUpdater);

export default connect()(StateUpdater);
