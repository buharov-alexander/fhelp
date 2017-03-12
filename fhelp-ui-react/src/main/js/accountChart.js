'use strict';

import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

const options = {
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var allData = data.datasets[tooltipItem.datasetIndex].data;
                var tooltipLabel = data.labels[tooltipItem.index];
                var tooltipData = allData[tooltipItem.index];
                var total = 0;
                allData.map(value => {
                    total += value
                });
                var tooltipPercentage = Math.round((tooltipData / total) * 100);
                return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
            }
        }
    }
};

const colorSet = [
    '#286090',
    '#5cb85c',
    '#5bc0de',
    '#ec971f',
    '#d9534f',
    '#FF7733'
];

function generateColors(length) {
    var colors = [colorSet[0]];
    for(var i = 1; i < length; i++) {
        colors.push(colorSet[i%colorSet.length]);
    }
    return colors; 
};


class AccountChart extends Component {
    render() {
        var labels = [],
        values = [],
        colors = generateColors(this.props.accounts.length);

        this.props.accounts.forEach(account => {
            labels.push(account.name);
            values.push(account.rubBalance);
        });
        
        var data = { 
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

class ValutaChart extends Component {
    render() {
        var valutaMap = new Map(),
        colors = generateColors(this.props.accounts.length);

        valutaMap.set('RUB', 0);
        valutaMap.set('USD', 0);
        valutaMap.set('EUR', 0);

        this.props.accounts.forEach(account => {
            var value = valutaMap.get(account.valuta);
            valutaMap.set(account.valuta, value + account.rubBalance);
        });

        var labels = [],
        values = [];

        valutaMap.forEach((value, key, map) => {
            labels.push(key);
            values.push(value);
        });
        
        var data = { 
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

export {AccountChart, ValutaChart};