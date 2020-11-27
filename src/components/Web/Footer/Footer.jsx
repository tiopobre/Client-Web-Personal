import React from 'react';
import { Layout, Row, Col } from 'antd';
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';
import Newsletter from '../Newsletter/';
//
import './Footer.scss';
export default function Footer (){
    const { Footer } = Layout;
    return ( 
        <Footer className ="footer">
            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <Row>
                        <Col lg={7}> <MyInfo/> </Col>
                        <Col lg={10}> <NavigationFooter/> </Col>
                        <Col lg={7}> <Newsletter/> </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col lg={12}>2019 ALL RIGHTS RESERVED</Col>
                        <Col lg={12}>dANIEL ALEJANDRO SERRANO RICAURTE | DESARROLLADOR WEB</Col>
                    </Row>
                </Col>
                <Col lg={4}/>
            </Row>
        </Footer>
     );
}
 
