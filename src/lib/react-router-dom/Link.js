import React from 'react';
import PropTypes from 'prop-types';
import { createLocation } from 'history';

const isModifiedEvent = event => {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        target: PropTypes.string,
        replace: PropTypes.bool,
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    };

    static defaultProps = {
        replace: false,
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired,
                createHref: PropTypes.func.isRequired,
            }).isRequired,
        }).isRequired,
    };

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }

        if (
            !event.defaultPrevented 
            && event.button === 0
            && !this.props.target
            && !isModifiedEvent(event)
        ) {
            event.preventDefault();

            const { history } = this.context.router;
            const { replace, to } = this.props;

            if (replace) {
                history.replace(to);
            } else {
                history.push(to);
            }
        }
    };

    render() {
        const {
            replace,
            to,
            innerRef,
            ...props,
        } = this.props;

        if (!this.context.router) {
            console.log('you should not use <link> outside a <Router>');
        }

        const { history } = this.context.router;
        const location = 
            typeof to === 'string'
            ? createLocation(to, null, history.location)
            : to;
        const href = history.createHref(location);

        return (
            <a {...props} onClick={this.handleClick} href={href} ref={innerRef} />
        );
    }
}

export default Link;
