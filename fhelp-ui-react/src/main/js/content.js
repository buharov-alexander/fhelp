'use strict';

import React, {Component} from 'react';
import AccountTable from './accountTable';
import {AccountChart, ValutaChart} from './accountChart';
import ValutesRate from './valutesRate';
import {PageHeader, Grid, Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

class Content  extends Component {
    render() {
        return (
            <div>
                <PageHeader>Financial helper <small>Accounts</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col md={8}>
                            <AccountTable accounts={this.props.accounts}/>
                            <Button bsStyle="primary">+</Button>
                        </Col>
                        <Col md={4}>
                            <ValutesRate rates={this.props.rates}/>
                            <AccountChart accounts={this.props.accounts}/>
                            <ValutaChart accounts={this.props.accounts}/>
                        </Col>
                    </Row>
                </Grid>
            </div> );
    }
}

function mapStateToProps (state) {
    return {
        accounts: state.accounts,
        rates: state.rates
    }
}

export default connect(mapStateToProps)(Content);