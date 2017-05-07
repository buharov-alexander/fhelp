'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import {options, generateColors} from './chartOptions'

class AccountPie extends Component {
    render() {
        const colors = generateColors(this.props.accounts.length);

        const typeMap = new Map();
        this.props.accounts.forEach(account => {
            const property = this.props.propertyForGrouping(account);
            const value = typeMap.get(property) || 0;
            typeMap.set(property, value + account.rubBalance);
        });
        
        const labels = [],
        values = [];

        typeMap.forEach((value, key, map) => {
            labels.push(key);
            values.push(value);
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
        accounts: state.data.accounts,
    }
}

export default connect(mapStateToProps)(AccountPie);