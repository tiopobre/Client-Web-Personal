import React from 'react';
import { Row, Col, Card} from 'antd';
import { ClockCircleOutlined, KeyOutlined, MessageOutlined, UserOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
//
import './HowMyCourses.scss';
export default function HomeMyCourses () {
    return ( 
        <Row className = "how-my-courses-work">
            <Col lg = {24} className = "how-my-courses-work__title">
                <h2>¿Como funcionan mis cursos? </h2>
               <h3>Cada curso cuenta con contenido baj la web de Udemy,
               activa las 24 horas los 365 días del año</h3> 
            </Col>
            <Col lg ={4}/>
            <Col lg ={16}>
               <Row className ="row-cards">
                    <Col md = {8}>  
                        <CardInfo 
                            Icono = { ClockCircleOutlined } 
                            title = "Cursos y claces"
                            description = "cusrsos de entre 10 y 30 horas y cada clase de l curso son una duración máxima de "
                        /> 
                    </Col>

                    <Col md = {8}> 
                        <CardInfo 
                            Icono = { KeyOutlined } 
                            title = "Acceso 24/7"
                            description = "Accede a los cursos en cualquier momento, desde cualquier lugar sin importar día ni hora "
                        /> 
                    </Col>


                    <Col md = {8}>  
                        <CardInfo 
                            Icono = { MessageOutlined } 
                            title = "Aprendisaje colaborativo"
                            description = "Aprende de los dejando tus dudas, para que profesores y compañeros te ayuden"
                        /> 
                    </Col>
                </Row> 
                <Row className ="row-cards">
                    <Col md = {8}>  
                        <CardInfo 
                            Icono = { UserOutlined } 
                            title = "Mejora tu perfil"
                            description = "Aprende y mejora tu perfil para mantenerte informado de actualizaciones"
                        /> 
                    </Col>

                    <Col md = {8}> 
                        <CardInfo 
                            Icono = { DollarOutlined } 
                            title = "Precios Bajos"
                            description = "Obten el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado."
                        /> 
                    </Col>


                    <Col md = {8}>  
                        <CardInfo 
                            Icono = { CheckCircleOutlined } 
                            title = "Certificados de finalización"
                            description = "Al completar un cirso recibirás un certificado que te expedira Udemy"
                        /> 
                    </Col>
                </Row>
            </Col>
            <Col lg ={4}/>
        </Row>
     );
}
 
function CardInfo ({ Icono, title, description }) {
    const { Meta } = Card;
    
    return (
        <Card className = "how-my-courses-work__card">
            <Icono/>
            <Meta title = { title } description = { description } />
        </Card>
    );
}