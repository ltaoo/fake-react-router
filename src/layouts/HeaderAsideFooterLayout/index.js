/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Route, NavLink } from '../../lib/react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { asideNavs } from '../../routes/navs';
import SideMenu from './SideMenu';
import './index.css';

const { Content, Header, Footer, Sider } = Layout;

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    current: 0,
  };

  renderMenus = () => {
    return asideNavs.map((nav, i) => (
      <Menu.Item key={i}>
        <NavLink to={nav.to}>
          <Icon type={nav.icon} />
          <span className="nav-text">{nav.text}</span>
        </NavLink>
      </Menu.Item>
    ));
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { route } = this.props;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <SideMenu collapsed={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {<route.indexRoute.component />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
