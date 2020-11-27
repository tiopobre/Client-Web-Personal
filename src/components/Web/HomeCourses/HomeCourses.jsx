import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import reactjsHooks from '../../../assets/img/jpg/react-js-hooks.jpg';
import cssGrid from '../../../assets/img/jpg/css-grid.jpg';
import javascript from '../../../assets/img/jpg/javascript-es6.jpg';
import prestashop from '../../../assets/img/jpg/prestashop-1-7.jpg';
import reactNative from '../../../assets/img/jpg/react-native.jpg';
import wordpress from '../../../assets/img/jpg/wordpress.jpg';
import './HomeCourses.scss'

export default function  HomeCourses () {
    return ( 
        <div>
            <Row className = "home-courses">
                <Col lg= {24} className = "home-courses__title" >
                    <h2>Aprende y mejora tus Habilidades</h2>
                </Col>
                <Col lg = {4} />
                <Col lg = {16} >
                    <Row className ="row-courses">
                        <Col md = {6} >
                           <CardCourse 
                                image = { reactjsHooks }
                                title = "React Js Hooks"
                                subtitle = "Intermedio - Reacj/Javascript"
                                // link = {  }
                           /> 
                        </Col> 
                        <Col md = {6} >
                            <CardCourse 
                                image = { reactNative }
                                title = "React Native"
                                subtitle = "Intermedio - Reacj/Javascript"
                                // link = {  }
                           /> 
                        </Col>
                        <Col md = {6} >
                            <CardCourse 
                                image = { javascript }
                                title = "javascript ES6"
                                subtitle = "Básico - Javascript"
                                // link = {  }
                            />  
                        </Col> 
                        <Col md = {6} >
                            <CardCourse 
                                image = { wordpress }
                                title = "Wordpress"
                                subtitle = "Básico - WordPress"
                                // link = {  }
                            /> 
                        </Col>    
                    </Row>
                    <Row className= "row-courses" >
                    <Col md = {6} >
                            <CardCourse 
                                image = { prestashop }
                                title = "Prestashop 1.7"
                                subtitle = "Básico - Prestashop"
                                // link = {  }
                            /> 
                        </Col>
                        <Col md = {6}/>
                        <Col md = {6}/>
                        <Col md = {6} >
                            <CardCourse 
                                image = { cssGrid }
                                title = "Css Grid"
                                subtitle = "Intermedio - CSS"
                                // link = {  }
                            /> 
                        </Col>
                    </Row>
                </Col>
                <Col lg = {4} />
                <Col lg = {24} className = "home-courses__more">
                    <Link to = "/courses">
                        <Button>Ver mas</Button>
                    </Link>
                </Col>
            </Row>
        </div>
     );
}
 
function CardCourse ({ image, title, subtitle, link}){
    const { Meta } = Card;

    return(
        < a href = { link } target = "blank" rel ="noponer noreference"> 
            <Card 
                className = "home-courses__card"
                cover = { <img src = {image} alt = {title} /> }
                actions = {[<Button>Ingresar</Button>]}
            >
                <Meta title = { title } description = { subtitle }/>
            </Card>
        </a>
    );
}