'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';

class ValutesRate extends Component{
    render() {
        return (<Panel header="Exchange rates" bsStyle="info">
            <p>USD/RUB: {this.props.rates.USD}</p>
            <p>EUR/RUB: {this.props.rates.EUR}</p>
        </Panel>);
    }
}

function mapStateToProps (state) {
    return {
        accounts: state.accounts,
        rates: state.rates
    }
}

export default connect(mapStateToProps)(ValutesRate);
