'use strict';

import React, {Component} from 'react';
import {PageHeader, Grid, Row, Col, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import AccountTable from './accountTable';
import AccountChart from './accountChart';
import ValutesRate from './valutesRate';
import NewAccountPanel from './newAccountPanel';

class Content  extends Component {
    render() {
        return (
            <div>
                <PageHeader className="pageHeader">Financial helper <small>Accounts</small></PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col md={8}>
                            <AccountTable />
                            <NewAccountPanel />
                        </Col>
                        <Col md={4}>
                            <ValutesRate />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <AccountChart propertyForGrouping={account => account.type} />
                        </Col>
                        <Col md={6}>
                            <AccountChart propertyForGrouping={account => account.valuta} />
                        </Col>
                    </Row>
                </Grid>
            </div> );
    }
}

export default Content;