'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import LineChart from '../../chart/lineChart';

const options = {
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                displayFormats: {
                    quarter: 'MMM YYYY'
                },
                max: new Date()
            }
        }]
    }
};

class StateChart extends Component {
    getData() {
        let coordinates = [];
        if (this.props.states) {
            coordinates = this.props.states.map(state => {
                return {x:state.date , y: state.balance};
            });
            coordinates.reverse();
            coordinates.push({x: new Date(), y: this.props.states[0].balance});
        }
        
        const data = {
            datasets: [{
                label: 'Account states',
                data: coordinates
            }]
        }

        return data;
    }

    render() {
        const data = this.getData();
        return (
            <Paper className="paper contentColumn" style={{width: '50%'}}>
                <LineChart data={data} options={options}/>
            </Paper>
        );
    }
}

export default StateChart;
