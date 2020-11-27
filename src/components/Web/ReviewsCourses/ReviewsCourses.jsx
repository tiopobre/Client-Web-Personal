import React from 'react';
import { Row, Col, Card, Avatar} from 'antd';
import AvatarPersona from '../../../assets/img/jpg/avatar.jpg';

import './ReviewsCourses.scss';
export default function ReviewsCourses () {
    return ( 
        <>
            <Row className = "review-courses">
               <Col lg = {4}/>
               <Col lg = {16} className = "review-courses__title">
                   <h2>Forma parte de los +35 mil estudiantes
                       qu estan aprendiendo con mis cursos
                   </h2>
               </Col>
               <Col lg = {4}/>
            </Row>
            <Row className = "review-courses">
                <Col lg = {4}/>               
                <Col lg = {16} >
                    <Row className = "row-cards">
                        <Col md = {8}>
                            <CardReview
                                    name = "Alonso Campos"
                                    subtitle = "Alumno de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. asndkjashduaiñfhñ< lorewnakdnbakñjfahfgbjhfgk<f<gfk"
                            />
                        </Col>
                        <Col md = {8}>
                            <CardReview
                                    name = "David Ramiro"
                                    subtitle = "Alumno de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. asndkjashduaiñfhñ< lorewnakdnbakñjfahfgbjhfgk<f<gfk"
                            />
                        </Col>
                        <Col md = {8}>
                            <CardReview
                                    name = "Valeria rubio"
                                    subtitle = "Alumna de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. asndkjashfgbjhfgk<f<gfk"
                            />
                        </Col>
                    </Row>
                    <Row className = "row-cards">
                        <Col md = {8}>
                            <CardReview
                                    name = "Carlo Perez"
                                    subtitle = "Alumno de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. asndkjashduaiñfhñ< lorewnakdnbakñjfahfgbjhfgk<f<gfk"
                            />
                        </Col>
                        <Col md = {8}>
                            <CardReview
                                    name = "Harvey Cortez"
                                    subtitle = "Alumno de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. añjfahfgbjhfgk<f<gfk"
                            />
                        </Col>
                        <Col md = {8}>
                            <CardReview
                                    name = "Camila Saenz"
                                    subtitle = "Alumna de Udemy"
                                    avatar = { AvatarPersona }
                                    review = "Un curso. asndkjashduaiñfhñ< lorewnakdnbakñjfahfgbjhfgk<f<gfk"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg = {4}/>
              </Row>
        </>
       
     );
}
 

function CardReview ({ name, subtitle, avatar, review }){
    const { Meta } = Card;

    return(
        <Card className = "review-courses__card">
            <p>{ review }</p>
            <Meta
                avatar = { < Avatar src = {AvatarPersona} />}
                title = {name}
                description = {subtitle}
            />
        </Card>
    );
}