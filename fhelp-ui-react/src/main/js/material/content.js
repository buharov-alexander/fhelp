'use strict';

import React, {Component} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppFrame from './appFrame'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class Content extends Component {

    changeDrawerVisibility() {
        this.props.setDrawerVisibility(!this.props.isVisibleDrawer);
    }

    render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <AppFrame />
        </MuiThemeProvider>);
    }
}

export default Content;