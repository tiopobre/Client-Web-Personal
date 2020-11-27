import React from 'react';
import { Row, Col } from 'antd';
import { BookOutlined, CodeOutlined, DatabaseOutlined, RightOutlined, HddOutlined, AppstoreOutlined, UserOutlined }  from '@ant-design/icons';
import { Link } from 'react-router-dom';
//
import './NavigationFooter.scss';
export default function NavigationFooter (){
    return ( 
        <Row className = "navigation-footer">
            <Col md = {24}>
                <h3>Navegacion</h3>
            </Col>
            <Col md = {12}>
                <RenderListLeft/>
            </Col>
            <Col md = {12}>
                <RenderListRight/>
            </Col>
        </Row>
     );
}
 

function RenderListLeft () {
    return (
        <ul>
            <li>
                <a href= "https://www.youtube.com">
                    <BookOutlined/> Cursos online
                </a>
            </li>
            <li>
                <Link to = "/contact" >
                    <CodeOutlined/> Contact
                </Link>
            </li>
            <li>
                <a href= "https://www.youtube.com">
                    <DatabaseOutlined/> Base de Datos
                </a>
            </li>
            <li>
                <a href= "https://www.youtube.com">
                    <RightOutlined/> Politica de privacidad
                </a>
            </li>
        </ul>
    );
}


function RenderListRight () {
    return (
        <ul>
            <li>
                <a href= "https://www.youtube.com">
                    <HddOutlined/> Sistemas / Servicios
                </a>
            </li>
            <li>
                <Link to = "/contact" >
                    <AppstoreOutlined/> CMS
                </Link>
            </li>
            <li>
                <a href= "https://www.youtube.com">
                    <UserOutlined/> Portafolio
                </a>
            </li>
            <li>
                <a href= "https://www.youtube.com">
                    <RightOutlined/> Politica de Cookies
                </a>
            </li>
        </ul>
    );
}