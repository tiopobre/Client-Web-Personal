import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Rate } from 'antd';
import { getCourseDataUdemyApi } from '../../../../api/course';
//
import './CoursesList.scss';
export default function CoursesList({ courses }) {
    
    return (
        <div className = "courses-list">
           <Row>
                <Col md = { 4 }/>
                <Col md = { 16 }>
                    <Row >
                    { courses.map( course => 
                        <Col md = {8} className = "courses-list__course">
                            <Course 
                                key = { course._id }
                                course = { course }
                            />  
                        </Col>
                     ) }
                    </Row>
                </Col>
                <Col md = { 4 }/>
           </Row>
        </div>
      );
}

const Course =({ course }) => {
    const [ courseData, setCourseData ] = useState({});
    const [ urlCourse, setUrlCourse ] = useState("");
    const { Meta } = Card;
    useEffect( () => {
        getCourseDataUdemyApi( course.idCourse ).then( response => {
            if ( response.code !== 200 ) {
               console.log(`el curso con el id: ${ course.idCourse } no se ha encontrado`);
            }else{
                setCourseData( response.data );
            }   
        })
        nounUrl( courseData.link );
    }, [ course ]); 
    if ( !courseData ) {
        return null;
    }

    const nounUrl = url => {
        if ( !course.link  ) {
            const baseUrl = `https://www.udemy.com${ url }`
            const finalUrl = baseUrl +  ( course.cupon ? `?couponCode= ${ course.cupon }` : "" );
            setUrlCourse( course.link );
        }else{
            setUrlCourse( course.link );
        } 
    }

    return(
        <a href = { urlCourse } target = "_blank" rel = "noopener noreferrer" >
            <Card
                cover = { <img src ={ courseData.image_480x270 } alt = { courseData.tittle }/> }
            >
                <Meta
                    title = { courseData.title }
                    description = { courseData.headline }
                />
                <Button> Entrar en el Curso</Button>
                <div className = "courses-list__course-footer">
                    <span> { course.price? `$ ${ course.price } `: `$ ${ courseData.price } `  } </span>
                    <div>
                        <Rate disabled defaultValue = {4} />
                    </div>
               </div>
            </Card>
        </a>       
    )
}
 
