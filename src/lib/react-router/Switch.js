import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import matchPath from './matchPath';

class Switch extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
            route: PropTypes.object.isRequired,
        }).isRequired,
    };

    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
    };

    componentWillMount() {
        if (!this.context.router) {
            console.error('You should not use <Switch> outside a <Router>');
        }
    }

    componentWillReceiveProps(nextProps) {
        warning(
            !(nextProps.location && !this.props.location),
            '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used to "location" props and then provided one on a subsequent render.'
        );
        warning(
            !(!nextProps.location && this.props.location),
            '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
        );
    }

    render() {
        const { route } = this.context.router;
        const { children } = this.props;
        const location = this.props.location || route.location;

        let match = null; 
        let child;

        React.Children.forEach(children, element => {
            if (match === null && React.isValidElement(element)) {
                const {
                    path: pathProp,
                    exact,
                    strict,
                    sensitive,
                    from,
                } = element.props;

                const path = pathProp || from;

                child = element;
                match = path ? matchPath(location.pathname, { path, exact, strict, sensitive }, route.match) : route.match;
            }
        });
        return match
        // 这里提供了 computedMatch 给 Route
            ? React.cloneElement(child, { location, computedMatch: match })
            : null;
    }
}

export default Switch;
