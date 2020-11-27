import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import SocialLinks from '../SocialLinks';
import { getMenusApi } from '../../../api/menu';
import logoWeb from '../../../assets/img/png/logo192.png'
//
import './MenuTop.scss';
export default function () {
    const [ menuData, setMenuData] = useState ([]);
    useEffect( ()=> {
        getMenusApi()
        .then( response =>{
            const arrayMenu = [];
            response.menus.forEach ( item =>{
                item.active && arrayMenu.push( item ); /// esto es un if
            } );
            setMenuData( arrayMenu );
        });
    } ,[]);

    return (
        <Menu className = "menu-top-web" mode = "horizontal">
            <Menu.Item className = "menu-top-web__logo">
                <Link to = {"/"}>
                    <img src={logoWeb} alt="Logo react"/>
                </Link>
            </Menu.Item>
           { menuData.map( item => {
               const external = item.url.indexOf("http") >-1 ? true : false;
                if (external) {
                    return (
                        <Menu.Item key = { item._id } className = "menu-top-web__item">
                            <a href={ item.url } target = "_blank" rel="noopener noreferrer"> { item.title }  </a>
                        </Menu.Item>
                    );
                }

                return (
                    <Menu.Item key = { item._id } className = "menu-top-web__item">
                    <Link to = { item.url }>{ item.title }</Link>
                    </Menu.Item>
                )
               
           } ) }
            <SocialLinks/>
        </Menu>
    );
}