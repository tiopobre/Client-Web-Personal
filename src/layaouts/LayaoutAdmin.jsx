import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
//Components
import AdminSignIn from '../pages/Admin/SignIn';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
//
import useAuth from '../Hooks/useAuth';
//import { getAccesToken, getRefreshToken } from '../api/auth';
//
import './LayaoutAdmin.scss'


const LoadRoutes = ({ routes }) => {
    return <Switch>
            {routes.map( (route, index) => (
                <Route
                    key = { index }
                    path = { route.path }
                    exact = { route.exact }
                    component = { route.component }
                />
            ))}
        </Switch>;
}

export default function LayaoutAdmin( {routes} ) {
    //states
    const [ menuCollapsed, setMenuCollapsed ] = useState( false );
    // destruct
    const { Header, Content, Footer } = Layout;
    const { user, isLoading} = useAuth();

    if ( !user && !isLoading ){
        return(
            <>
                <Route path="/admin/login" component = {AdminSignIn}/>
                <Redirect to ="/admin/login"/>
             </>
        );
    }

    if ( user && !isLoading ) {
        return ( 
            <Layout>
                <MenuSider menuCollapsed= { menuCollapsed } />
                <Layout className = "layaout-admin" style = { {marginLeft: menuCollapsed ? "80px" : "200px" }}>
                      <Header className="layaout-admin__header">
                          <MenuTop
                              menuCollapsed       = { menuCollapsed }
                              setMenuCollapsed    = { setMenuCollapsed }
                          />
                      </Header>
                      <Content className="layaout-admin__content">
                          <LoadRoutes
                              routes = {routes}
                          />
                      </Content>
                      <Footer className="layout-admin__footer">Daniel Serrano</Footer>
                </Layout>
            </Layout>
           );
    }else{
        return null;
    }
    
}