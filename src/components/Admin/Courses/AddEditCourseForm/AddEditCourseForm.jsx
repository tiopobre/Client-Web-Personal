import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { DollarOutlined, GiftOutlined, KeyOutlined, LinkOutlined } from '@ant-design/icons';
import { addCourseApi, updateCourseApi } from '../../../../api/course';
import { getAccesTokenApi } from '../../../../api/auth';

//
import './AddEditCourseForm.scss';
export default function AddEditCourseForm({ setIsVisibleModal, setReloadCourses, course }) {
    const [ courseData, setCourseData ] = useState({});
    useEffect( ()  => {
        course ? setCourseData( course ) : setCourseData({});
    } , [ course ]);
    const addCourse = ( e ) =>{
        e.preventDefault();
        if ( !courseData.idCourse ) {
            notification["warning"]({ message: "el id del curso es obligatorio" })
        }else{
            const accesToken = getAccesTokenApi();
            addCourseApi ( accesToken, courseData )
                .then( response => {   
                    const NotificationType = response !== 'Curso creado correctamente.' ?
                    'warning' : 'success' ;    
                    notification[ NotificationType ]({ message: response });
                    setIsVisibleModal( false );
                    setReloadCourses( true );
                    setCourseData( {} );
                } )
                .catch( error => notification["error"]({ message: error }) )
        }
    }

    const updateCourse = ( e ) =>{
        e.preventDefault();
        const accesToken = getAccesTokenApi();
        updateCourseApi ( accesToken, courseData._id ,courseData )
            .then( response => {   
                const NotificationType = response !== 'Curso acutalizado.' ?
                'warning' : 'success' ;    
                notification[ NotificationType ]({ message: response });
                setIsVisibleModal( false );
                setReloadCourses( true );
                setCourseData( {} );
            } )
            .catch( error => notification["error"]({ message: error }) )
        
    }
    
    return ( 
        <div className = "add-edit-course-form">
            <AddEdditForm
                course = { course }
                courseData = { courseData }
                addCourse = { addCourse }
                updateCourse = { updateCourse }
                setCourseData = { setCourseData }
            />
        </div>
     );
}

function AddEdditForm ({ course, courseData, addCourse, updateCourse, setCourseData }){
    const { idCourse, link, price, cupon } = courseData;
  
    const obtenerInformacion= e =>{
        setCourseData({
            ...courseData,
            [ e.target.name ] : e.target.value
        })
    }
    return (
        <Form 
            className = "form-add-edit"
            onSubmitCapture = { course ?  updateCourse :  addCourse }
        >
            <Form.Item>
                <Input
                    prefix = { <KeyOutlined/> }
                    placeholder = "ID del curso"
                    name = "idCourse"
                    value={ idCourse }
                    onChange = {  e => obtenerInformacion(e) }
                    disabled = { course? true : false }
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = { <LinkOutlined/> }
                    name = "link"
                    placeholder = "Link al curso"
                    value={ link }
                    onChange = { e => obtenerInformacion (e) }
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = { <GiftOutlined/> }
                    placeholder = "Cupon de descuento"
                    name = "cupon"
                    value={ cupon }
                    onChange = {  e => obtenerInformacion(e) }
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = { <DollarOutlined/> }
                    placeholder = "Precio del curso"
                    name = "price"
                    value={ price }
                    onChange = { e => obtenerInformacion(e) }
                />
            </Form.Item>
            <Form.Item>
                <Button 
                    type = "primary" 
                    htmlType = "submit"
                    className = "btn-submit"
                >
                        { course ? "Actualizar curso" : "Crear curso" }
                </Button>
            </Form.Item>

        </Form>
    );
}
 
