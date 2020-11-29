import React, { useState, useEffect} from 'react';
import { getCourseDataUdemyApi, deleteCourseApi, updateCourseApi } from '../../../../api/course';
import { getAccesTokenApi } from '../../../../api/auth';
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { DeleteOutlined, EditOutlined }  from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';
import Modal from '../../../Modal';
import AddEditCourseForm from '../AddEditCourseForm';
//
import './CoursesList.scss';
const { confirm } = ModalAntd;

export default function CoursesList ({ courses, setReloadCourses }) {
    const [ listCourses, setListCourses ] = useState([]);
    const [ isVisibleModal, setIsVisibleModal ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState("");
    const [ modalContent, setModalContent ] = useState( null );

    useEffect( () =>{
        const ListCoursesArray = [];
        courses.forEach( course =>{
            ListCoursesArray.push( {
                content:  <Course
                            course = { course }
                            deleteCourse = { deleteCourse }
                            editCourseModal = { addCourseModal }
                        /> 
            } );
        } );
        setListCourses ( ListCoursesArray );
    } , [ courses ]);

    const onSort = ( sortedList, dropEvent)=>{
        const accessToken = getAccesTokenApi();
        sortedList.forEach( item => {
            const { _id } = item.content.props.course;
            const order = item.rank;
            updateCourseApi( accessToken, _id, { order } );
        });
   }

   const addCourseModal =  course  =>{
        setIsVisibleModal( true );
        setModalTitle ( !course ? "Creando Nuevo Curso" : `Editar Curso ${ course.idCourse }` ); 
        setModalContent (
            <AddEditCourseForm
                course = { course }
                setIsVisibleModal = { setIsVisibleModal }
                setReloadCourses = { setReloadCourses }
            />
        );
   }

   const editCourseModal =  course  =>{
    setIsVisibleModal( true );
    setModalTitle ( `Editar Curso ${ course.idCourse }` ); 
    setModalContent (
        <AddEditCourseForm
            course = { course }
            setIsVisibleModal = { setIsVisibleModal }
            setReloadCourses = { setReloadCourses }
        />
    );
}

    const deleteCourse = course =>{
        const accestoken = getAccesTokenApi();
        confirm({
            title : "Eliminando Curso",
            content: `Estas seguro de que quieres eliminar el curso ${ course.idCourse }`,
            okText :"Eliminar",
            okType : "danger",
            cancelText : "Cancelar",
            onOk(){
                deleteCourseApi( accestoken, course._id )
                    .then( response => {
                        const typeNotification = response.code ===200 ? "success" : "warning";
                        notification[typeNotification]({ message: response.message} );
                        setReloadCourses(true);
                    } )
                    .catch( ()=>  {
                        notification["error"]({ message: "error del servidor"} );
                    } );
            }
        });
    }

    return ( 
        <div className = "courses-list">
            <div className ="courses-list__header">
                <Button 
                    type = "primary" 
                    onClick = { () => addCourseModal(null) }
                > 
                    Nuevo Curso
                </Button>
            </div>
            <div className = "courses-list__items">
                { listCourses.length === 0 && (
                    <h2 style = {{ textAlign: "center", margin: 0 }} > 
                        No tienes cursos creados
                    </h2>
                )}
                <DragSortableList 
                    items = {listCourses}
                    onSort = {onSort}
                    type = "vertical"
                />
            </div>
            <Modal
                title = { modalTitle }
                isVisible = { isVisibleModal }
                setIsVisible = { setIsVisibleModal }
                children = { modalContent }
            />
        </div>
     );
}
 
function Course ({ course, deleteCourse, editCourseModal }) {
    const [ courseData, setCourseData ] = useState ( null );
    useEffect( () => {
        getCourseDataUdemyApi( course.idCourse ).then( response => {
            if ( response.code !== 200 ) {
                notification['warning']({ message: `el curso con el id: ${ course.idCourse } no se ha encontrado` });
            }else{
                setCourseData( response.data );
            }   
        })
    }, [ course ]); 
    if ( !courseData) {
        return null;
    }
    return (
        <List.Item
            actions = {[
                <Button 
                    type = "primary" 
                    onClick = { () => editCourseModal( course ) }
                >
                    <EditOutlined/>
                </Button>,

                <Button 
                    type = "danger" 
                    onClick = { () => deleteCourse ( course )  }
                >
                    <DeleteOutlined/>
                </Button>,
            ]}
        >
            <img 
                src = { courseData.image_480x270 } 
                alt = {courseData.link}
                style = {{ width: "100px", marginRight : "20px" }}
            />
            <List.Item.Meta
                title = { `${ courseData.title } | ID: ${ course.idCourse }` }
            />
        </List.Item>
    );
}