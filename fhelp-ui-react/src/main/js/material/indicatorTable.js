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
            <TableRowColumn>
                {this.props.indicator.name}
            </TableRowColumn>
        );
    }
}

class IndicatorValue extends Component {
    render() {
        return (
            <TableRowColumn>
                {this.props.indicator.value}
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