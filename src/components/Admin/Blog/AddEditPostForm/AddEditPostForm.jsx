import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';
import { getAccesTokenApi } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';  
import './AddEditPostForm.scss';

export default function AddEditPostForm ({ setIsVisibleModal, setReloadPosts, post }) {
    const [ postData, setPostData ] = useState ({});
    
    useEffect ( ()=> {
        if ( post ) {
            setPostData( post );
        } else {
            setPostData( {} );
        }
    } , [ post ])
    // pAñadir 

    const processPost = e => {
        const { title, url ,date, description } = postData;
        if ( !title || !url || !date || !description ) {
            notification["error"]({ message: "Todo los campos son obligatorios."});
        }else{
            if ( post ) {
                updatePost();
                setIsVisibleModal( false );
                setReloadPosts( true );
            } else {
                addPost();
                setIsVisibleModal( false );
                setReloadPosts( true );
            }
        }  
    }

    const addPost = () => {
        const token = getAccesTokenApi();
        addPostApi( token, postData )
            .then( response => {
                const typeNotification = response.code === 200? "success" : "warning" ;
                notification[typeNotification]({ message: response.message });
            } )
            .catch( err => notification["error"]({ message: "Error del servidor."}) )
    }

    const updatePost = () =>{
        const token = getAccesTokenApi();
        updatePostApi( token, post._id ,postData )
            .then( response => {
                const typeNotification = response.code === 200? "success" : "warning" ;
                notification[typeNotification]({ message: response.message });
            } )
            .catch( err => notification["error"]({ message: "Error del servidor."}) )
    }

    return ( 
        <div className = "add-edit-post-form">
            <AddEditForm
                postData = { postData }
                setPostData = { setPostData }
                post = { post }
                processPost = {processPost}
            />
        </div>
      );
}
 

function AddEditForm ({ postData, setPostData, post, processPost }) {
    return (
        <Form 
            className = "add-edit-post-form"
            layout = "inline"
            onSubmitCapture = { e => processPost(e) }
        > 
            <Row gutter = {24}>
                <Col span = {8}>
                    <Input
                        prefix ={ <FontSizeOutlined/> }
                        placeholder = "Titulo"
                        value = { postData.title }
                        onChange = { e => setPostData ({ ...postData, title: e.target.value })}
                    />
                </Col>
                <Col span = {8}>
                    <Input
                        prefix ={ <LinkOutlined/> }
                        placeholder = "url"
                        value = { postData.url }
                        onChange = { e => setPostData ({ ...postData, url: TransformTextToUrl(e.target.value) })}
                    />
                </Col>
                <Col span = {8}>
                    < DatePicker
                        style = {{ width: "100%" }}
                        format = "DD/MM/YYYY HH:mm:ss"
                        placeholder = "Fecha de publicación"
                         value = { postData.date && moment( postData.date) }
                         onChange = { ( e, value ) => setPostData ({
                              ...postData, 
                              date: moment( value, "DD/MM/YYYY HH:mm:ss" ).toISOString()
                        })}
                    />
                </Col>
            </Row>
            <Editor  
                value = { postData.description? postData.description : "" }
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onBlur = { e => setPostData({ ...postData, description: e.target.getContent() }) } 
            />
           <Button type = "primary" htmlType= "submit" className = "btn-submit">
                { post? "Editar post" : "Crear Post" }
            </Button> 
        </Form>
    ) ;
}


function TransformTextToUrl ( text ) {
    const url = text.replace( " ", "-" );
    return url.toLowerCase();
}