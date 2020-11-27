import React from 'react';
import { Link } from 'react-router-dom';
import DasLogo from '../../../assets/img/png/logo192.png';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined , PoweroffOutlined } from '@ant-design/icons';
//
import './MenuTop.scss';
//
import { logout } from '../../../api/auth';
export default function MenuTop({ menuCollapsed, setMenuCollapsed }) {
    const handleOnClick = ()=>{ setMenuCollapsed( !menuCollapsed ); }
    const logOutUser = () => {
        logout();
        window.location.reload();
    }
    return (  
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to = {"/"}>
                <img 
                        className="menu-top__left-logo"
                        src =  {DasLogo}
                        alt = "Daniel Serrano"
                    />
                </Link>
                    
                <Button 
                    type = "link"
                    onClick = { handleOnClick}> 
                    { (menuCollapsed) ?
                        <MenuUnfoldOutlined twoToneColor = "eb2f96"/>  
                     :
                        <MenuFoldOutlined twoToneColor = "eb2f96"/>                        
                     }
                </Button>
                
            </div>

            <div className="menu-top__right">
                <Button 
                    type = "link"
                    onClick = { logOutUser }> 
                    <PoweroffOutlined twoToneColor = "eb2f96"/>
                </Button>
            </div>
        </div>
    );
}
 
