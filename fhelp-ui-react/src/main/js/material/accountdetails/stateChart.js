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
                }
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
            const currentTime = new Date();
            coordinates.push({x: currentTime, y: this.props.states[0].balance});
            options.scales.xAxes[0].time.max = currentTime;
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
