'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
	render() {
		return (
			<Line data={this.props.data} options={this.props.options}/>
		);
	}
}

export default LineChart;