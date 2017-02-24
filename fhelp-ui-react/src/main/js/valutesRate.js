'use strict';

import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';

class ValutesRate extends Component{
    render() {
        return (<Panel header="Exchange rates" bsStyle="info">
            <p>USD/RUB: {this.props.rates.USD}</p>
            <p>EUR/RUB: {this.props.rates.EUR}</p>
        </Panel>);
    }
}

export default ValutesRate;