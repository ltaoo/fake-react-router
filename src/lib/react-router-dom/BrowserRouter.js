import warning from 'warning';
import React from 'react';
import PropTypes from 'prop-types';
import {
    createBrowserHistory as createHistory,
} from 'history';

import Router from './Router';

class BrowserRouter extends React.Component {
    static propTypes = {
        basename: PropTypes.string,
        forceRefresh: PropTypes.bool,
        getUserConfirmation: PropTypes,
        keyLength: PropTypes.number,
        children: PropTypes.node,
    };

    history = createHistory(this.props);

    componentWillMount() {
        warning(
            !this.props.history,
            `<BrowserRouter> ignores the history prop, To use a custom history,
            use \`import { router }\` instead of \`import { BrowserRouter as Router }\`.`
        );
    }

    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}

export default BrowserRouter;
