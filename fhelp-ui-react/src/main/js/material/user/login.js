'use strict';

import React, {Component} from 'react';
import {reduxForm, Field, reset} from 'redux-form';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'redux-form-material-ui';
import {required} from '../util/formValidator';

class LoginPage extends Component {
    
    signIn(values) {
        const user = {
            username: values.login,
            password: values.password
        }
        this.props.actions.login(user);
        this.props.actions.resetForm();
    }

    render() {
        const {handleSubmit, valid} = this.props;
        return (
            <form onSubmit={handleSubmit(this.signIn.bind(this))}>
                <div>
                    <Field 
                    className="formField"
                    name="login"
                    type="text"
                    floatingLabelText="Login"
                    validate={required}
                    component={TextField}/>
                </div>
                <div>
                    <Field 
                    className="formField"
                    name="password"
                    type="password"
                    floatingLabelText="Password"
                    validate={[required]}
                    component={TextField}/>
                </div>
                <div>
                    <RaisedButton
                    className="button"
                    type="submit"
                    disabled={!valid}
                    label="Sign in"
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
        login: (user) => {dispatch({type: 'LOGIN_USER', payload: user})},
        resetForm: () => {dispatch(reset('LoginForm'))}
    }
  }
}

LoginPage = connect(null, mapDispatchToProps)(LoginPage);
LoginPage = reduxForm({form: 'LoginForm'})(LoginPage);
export default LoginPage;