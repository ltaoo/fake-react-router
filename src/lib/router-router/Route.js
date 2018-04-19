import warning from 'warning';
import React from 'react';
import PropTypes from 'prop-types';

import matchPath from './matchPath';

const isEmptyChildren = children => React.Children.count(children) === 0;

class Route extends React.Component {
    static propTypes = {
        // private, from <Switch>?
        computedMatch: PropTypes.object,
        path: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        sensitive: PropTypes.bool,
        component: PropTypes.func,
        render: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        location: PropTypes.object,
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
            route: PropTypes.object.isRequired,
            staticContext: PropTypes.object,
        }),
    };

    static childrenContextTypes = {
        router: PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            router: {
                ...this.context.router,
                route: {
                    location: this.props.location || this.context.router.route.location,
                    match: this.state.match,
                },
            },
        };
    }

    state = {
        match: this.computedMatch(this.props, this.context.router),
    };

    computedMatch({
        computedMatch,
        location,
        path,
        strict,
        exact,
        sensitive,
    }, router) {
        // 如果 Route 是放在 Switch 中，computedMatch 已经计算好了。计算好了什么？
        if (computedMatch) {
            return computedMatch;
        }

        if (router) {
            console.error('You should not use <Route> or withRouter() outside a <Router>');
        }

        const { route } = router;
        const pathname = (location || route.location).pathname;

        return matchPath(pathname, { path, strict, exact, sensitive }, route.match);
    }

    componentWillMount() {
        // component、render、children 三者只能存其一
        warning(
            !(this.props.component && this.props.render),
            'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored'
        );
        warning(
            !(
                this.props.component &&
                this.props.children &&
                !isEmptyChildren(this.props.children)
            ),
            'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored'
        );
        warning(
            !(
                this.props.render &&
                this.props.children &&
                !isEmptyChildren(this.props.children)
            ),
            'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored'
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        warning(
            !(nextProps.location && !this.props.location),
            '<Route> elements should not change from uncontrolled to controlled (or vice versa).' +
            'You should initiallly used no "location" prop and then provided one on a subsequent render'
        );
        warning(
            !(!nextProps.location && this.props.location),
            '<Route> elements should not change from controlled to uncontrolled (or vice versa).' +
            'Yout provided a "location" prop initially but omitted it on a subsequent render'
        );
        this.setState({
            match: this.computedMatch(nextProps, nextContext.router),
        });
    }

    render() {
        const { match } = this.state;
        const {
            children,
            component,
            render,
        } = this.props;
        const {
            history,
            route,
            staticContext,
        } = this.context.router;
        const location = this.props.location || route.location;
        const props = { match, location, history, staticContext };

        if (component) {
            return match ? React.createElement(component, props) : null;
        }

        if (render) {
            return match ? render(props) : null;
        }

        if (typeof children === 'function') {
            return children(props);
        }

        if (children && !isEmptyChildren(children)) {
            return React.Children.only(children);
        }
        return null;
    }
}

export default Route;
