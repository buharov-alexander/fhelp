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
    '#EF476F',
    '#FFD166',
    '#06D6A0',
    '#118AB2',
    '#073B4C',
    '#FF7733'
];

function generateColors(length) {
    var colors = [colorSet[0]];
    for(var i = 1; i < length; i++) {
        colors.push(colorSet[i%colorSet.length]);
    }
    return colors; 
};


class AccountPieChart extends Component {
    render() {
        var labels = [],
        values = [],
        colors = generateColors(this.props.accounts.length);

        this.props.accounts.map(account => {
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

export default AccountPieChart;