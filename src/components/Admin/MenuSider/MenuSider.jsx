import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {  Layout, Menu} from 'antd';
import { BookOutlined, HomeFilled,  MenuOutlined, MessageOutlined, UserOutlined} from '@ant-design/icons';
//
import './MenuSider.scss'; 

const MenuSider =  ( { menuCollapsed, location } ) => {
    const { Sider } = Layout;
    return ( 
            <Sider className = "menu-sider" collapsed = { menuCollapsed }>
                <Menu theme = "dark" node ="inline" defaultSelectedKeys={ location.pathname === '/admin'? '0' : location.pathname }>
                    <Menu.Item key ="0">
                        <Link to = {"/admin"}>
                            <HomeFilled  twoToneColor = "eb2f96"/>
                            <span className ="nav-text">Home</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key ="/admin/users">
                        <Link to = {"/admin/users"}>
                            <UserOutlined color = "red"/>
                            <span className ="nav-text">Usuarios</span>
                        </Link>                    
                    </Menu.Item>

                    <Menu.Item key ="/admin/menu">
                        <Link to = {"/admin/menu"}>
                            <MenuOutlined />
                            <span className ="nav-text">Menu</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key ="/admin/courses">
                        <Link to = {"/admin/courses"}>
                            <BookOutlined />
                            <span className ="nav-text">Courses</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key ="/admin/blog">
                        <Link to = {"/admin/blog?page=1"}>
                            <MessageOutlined />
                            <span className ="nav-text">Blog</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
     );
}
 
export default withRouter( MenuSider );