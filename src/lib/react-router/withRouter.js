import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import Route from './Route';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }


/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    console.log(props);
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ['wrappedComponentRef']);

    return React.createElement(Route, { render: function render(routeComponentProps) {
        console.log(routeComponentProps);
        return React.createElement(Component, _extends({}, remainingProps, routeComponentProps, { ref: wrappedComponentRef }));
      } });
  };

  C.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  };

  return hoistStatics(C, Component);
};

export default withRouter;

// import React from 'react';
// import PropTypes from 'prop-types';
// import hoistStatics from 'hoist-non-react-statics';

// import Route from './Route';

// const withRouter = Component => {
//     const C = props => {
//         console.log(props);
//         const {
//             wrappedComponentRef,
//             ...remainingProps,
//         } = props;
//         return (
//             <Route
//                 render={routeComponentProps => {
//                     console.log(routeComponentProps);
//                     return (
//                         <Component
//                             {...remainingProps}
//                             {...routeComponentProps}
//                             ref={wrappedComponentRef}
//                         />
//                     );
//                 }}
//             />
//         );
//     };

//     C.displayName = `withRouter(${Component.displayName || Component.name})`;
//     C.WrappedComponent = Component;
//     C.propTypes = {
//         wrappedComponentRef: PropTypes.func,
//     };
//     // 将 Component 的属性拷贝到 C 上
//     return hoistStatics(C, Component);
// }

// export default withRouter;
