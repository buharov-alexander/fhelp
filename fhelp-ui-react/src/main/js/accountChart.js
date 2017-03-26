'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import {options, generateColors} from './chartOptions'

class AccountChart extends Component {
    render() {
        const labels = [],
        values = [],
        colors = generateColors(this.props.accounts.length);

        this.props.accounts.forEach(account => {
            labels.push(account.name);
            values.push(account.rubBalance);
        });
        
        const data = { 
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };

        return <Pie data={data} options={options}/>;
    };
}

function mapStateToProps (state) {
    return {
        accounts: state.accounts,
    }
}

export default connect(mapStateToProps)(AccountChart);