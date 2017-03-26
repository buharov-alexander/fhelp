'use strict';

const options = {
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                let allData = data.datasets[tooltipItem.datasetIndex].data;
                let tooltipLabel = data.labels[tooltipItem.index];
                let tooltipData = allData[tooltipItem.index];
                let total = 0;
                allData.map(value => {
                    total += value
                });
                let tooltipPercentage = Math.round((tooltipData / total) * 100);
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
    let colors = [colorSet[0]];
    for(let i = 1; i < length; i++) {
        colors.push(colorSet[i%colorSet.length]);
    }
    return colors; 
};

export {options, generateColors}