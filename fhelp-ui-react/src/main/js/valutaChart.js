'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs-2';
import {options, generateColors} from './chartOptions'

class ValutaChart extends Component {
    render() {
        const valutaMap = new Map(),
        colors = generateColors(this.props.accounts.length);

        valutaMap.set('RUB', 0);
        valutaMap.set('USD', 0);
        valutaMap.set('EUR', 0);

        this.props.accounts.forEach(account => {
            const value = valutaMap.get(account.valuta);
            valutaMap.set(account.valuta, value + account.rubBalance);
        });

        const labels = [],
        values = [];

        valutaMap.forEach((value, key, map) => {
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
        accounts: state.accounts,
    }
}

export default connect(mapStateToProps)(ValutaChart);