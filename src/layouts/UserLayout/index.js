import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route, Router } from '../../lib/react-router-dom';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';

// import GlobalFooter from '../GlobalFooter';
import styles from './index.css';
import { getRoutes } from '../utils';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 Kujiale
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    // if (routerData[pathname] && routerData[pathname].name) {
    //   title = `${routerData[pathname].name} - Ant Design Pro`;
    // }
    return title;
  }
  render() {
    const { routerData, match, route } = this.props;
    console.log(match, routerData, route);
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className="container">
          <div className="content">
            <div className="top">
              <div className="header">
                <Link to="/">
                  <span className="title">Kujiale</span>
                </Link>
              </div>
              <div className="desc">Login Page Header</div>
            </div>
            <Switch>
              <route.indexRoute.component />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
