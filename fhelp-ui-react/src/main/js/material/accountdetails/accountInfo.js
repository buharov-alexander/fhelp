'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import StateUpdater from './stateUpdater';
import StateChart from './stateChart';

class AccountInfo extends Component {
    
    render() {
        const account = this.props.currentAccount || {};
        return (
            <div>
                <List className="rowList">
                    <ListItem primaryText={account.name} secondaryText="Account name"/>
                    <ListItem primaryText={account.type} secondaryText="Type"/>
                    <ListItem primaryText={account.valuta} secondaryText="Valuta"/>
                    <ListItem primaryText={account.balance} secondaryText="Balance"/>
                </List>

                <div className="lineDiv">
                    <StateUpdater />
                    <StateChart states={this.props.accountStates[account.id]}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentAccount: state.data.accounts.find(account =>
            {return account.id == state.ui.currentAccountId;}),
        accountStates: state.data.accountStates
    }
}

export default connect(mapStateToProps)(AccountInfo);