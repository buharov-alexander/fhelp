'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';

const options = {
    scales: {
      yAxes: [{
        position: "left",
        "id": "y-rub"
      }, {
        position: "right",
        "id": "y-usd"
      }]
    }
};

class AccountTimeChart extends Component {

    componentDidMount() {
        this.props.actions.updateMonthBalance();
    }

    render() {
        const labels = [];
        const values = [];
        values['RUB'] = [];
        values['USD'] = [];

        if (!this.props.monthBalance) {
            return null;
        }

        Object.keys(this.props.monthBalance).sort().forEach(date => {
            const d = new Date(date);
            labels.push(`${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`);
            values['RUB'].push(this.props.monthBalance[date]['RUB'] || 0);
            values['USD'].push(this.props.monthBalance[date]['USD'] || 0);
        });

        const data = {
            labels: labels,
            datasets: [{
                label: 'Monthly balance(RUB)',
                yAxisID: "y-rub",
                backgroundColor: '#b77d2c',
                data: values['RUB']
            },
            {
                label: 'Monthly balance(USD)',
                yAxisID: "y-usd",
                backgroundColor: '#5cb85c',
                data: values['USD']
            }]
        };

        return <Bar data={data} options={options} />;
    };
}

function mapStateToProps(state) {
    return {
        monthBalance: state.statistic.monthBalance
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
        updateMonthBalance: (account) => {dispatch({type: 'UPDATE_MONTH_BALANCE_STATISTICS'});}
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTimeChart);
