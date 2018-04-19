import React, { Component } from 'react';
import { NavLink, withRouter } from '../../../lib/react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Sider } = Layout;

class SideMenu extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    };

    render() {
        const { location } = this.props;
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <Icon type="user" />
                            <span>Home</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/activity">
                        <NavLink to="/activity">
                            <Icon type="upload" />
                            <span>Notifications</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

// export default withRouter(SideMenu);
export default SideMenu;
