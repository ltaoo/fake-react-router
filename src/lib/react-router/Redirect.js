import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { createLocation, locationsAreEqual } from 'history';

import generatePath from './generatePath';
import { genPercentAdd } from 'antd/lib/upload/utils';

class Redirect extends React.Component {
    static propTypes = {
        // from <Switch>
        computedMatch: PropTypes.object,
        push: PropTypes.bool,
        from: PropTypes.string,
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    };
    static defaultProps = {
        push: false,
    };
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.isRequired,
            }).isRequired,
        }).isRequired,
    };
    isStatic() {
        return this.context.router && this.context.router.staticContext;
    }
    componentWillMount() {
        if (!this.context.router) {
            console.error('You should not use <Redirect> outside a <Router>');
        }
        if (this.isStatic()) {
            this.perform();
        }
    }
    componentDidMount() {
        if (!this.isStatic()) {
            this.perform();
        }
    }
    componentDidUpdate(prevProps) {
        const prevTo = createLocation(prevProps.to);
        const nextTo = createLocation(this.props.to);
        // 要跳转的地址相同
        if (locationsAreEqual(prevTo, nextTo)) {
            warning(
                false,
                `You tried to redirect to the same route you're currently on: ` +
                `"${nextTo.pathname}${nextTo.search}"`
            );
            return;
        }

        this.perform();
    }

    computeTo({ computedMatch, to }) {
        if (computedMatch) {
            if (typeof to === 'string') {
                return generatePath(to, computedMatch.params);
            } else {
                return {
                    ...to,
                    pathname: generatePath(to.pathname, computedMatch.params),
                };
            }
        }

        return to;
    }

    perform() {
        const { history } = this.context.router;
        const { push } = this.props;
        const to = this.computeTo(this.props);

        if (push) {
            history.push(to);
        } else {
            history.replace(to);
        }
    }

    render() {
        return null;
    }
}

export default Redirect;
