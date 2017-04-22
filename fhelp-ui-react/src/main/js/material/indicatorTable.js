'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class IndicatorTable extends Component {
    render() {
        const indicatorNames = this.props.indicators.map(indicator =>
            <IndicatorName key={indicator.name} indicator={indicator}/>
        );

        const indicatorValues = this.props.indicators.map(indicator =>
            <IndicatorValue key={indicator.name} indicator={indicator}/>
        );

        return (
            <Table>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        {indicatorNames}
                    </TableRow>
                    <TableRow>
                        {indicatorValues}
                    </TableRow>
                </TableBody>
            </Table>
            );
    }
}

class IndicatorName extends Component {
    render() {
        return (
            <TableRowColumn className="boldText">
                {this.props.indicator.name}
            </TableRowColumn>
        );
    }
}

class IndicatorValue extends Component {
    getColor(change) {
        if (change && change.charAt(0) == '-') {
            return "red";    
        }
        return "green";
    }

    render() {
        const change = this.props.indicator.change;
        return (
            <TableRowColumn>
                {this.props.indicator.value}
                <br/>
                <span style={{"color": this.getColor(change)}}>{change}</span>
            </TableRowColumn>
        );
    }
}


function mapStateToProps (state) {
    return {
        indicators: state.indicators,
    }
}

export default connect(mapStateToProps)(IndicatorTable);