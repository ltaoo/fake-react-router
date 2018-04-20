import warning from 'warning';
import React from 'react';
import PropTypes from 'prop-types';

class Router extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        children: PropTypes.node,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    static childContextTypes = {
        router: PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            router: {
                ...this.context.router,
                history: this.props.history,
                route: {
                    location: this.props.history.location,
                    match: this.state.match,
                },
            },
        };
    }

    state = {
        match: this.computeMatch(this.props.history.location.pathname),
    };

    computeMatch(pathname) {
        return {
            path: '/',
            url: '/',
            params: {},
            isExact: pathname === '/',
        };
    }
    componentWillMount() {
        const { children, history } = this.props;

        if (children !== null && React.Children.count(children) !== 1) {
            console.error('A <Router> may have only on child element');
        }
        // 注册监听器
        this.unlisten = history.listen(() => {
            this.setState({
                match: this.computeMatch(history.location.pathname),
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        warning(
            this.props.history === nextProps.history,
            'You cannot change <Router> history'
        );
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { children } = this.props;
        return children ? React.Children.only(children) : null;
    }
}

export default Router;

