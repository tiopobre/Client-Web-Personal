import React, { useState,useEffect, useCallback } from 'react';
import {Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';

import { getAvatarApi, uploadAvatarApi, updateUserApi }  from '../../../../api/user';
import { getAccesTokenApi } from '../../../../api/auth'

import './EditUserForm.scss';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';


// Local Components
const UploadAvatar = ({ avatar, setAvatar }) =>{
    //const avatarDefault = 'http://localhost:3977/api/v1/get-avatar/ZCQ9sVpZfmyCQRx_Rq2Tezg_.png';
    const [ avatarUrl, setAvatarUrl ]= useState ( null ); 
    useEffect( () => {
        if ( avatar ) {
            if ( avatar.preview ) {
                setAvatarUrl( avatar.preview );
                
            }else{
                setAvatarUrl ( avatar );                
            }  
        }else{
            setAvatarUrl (null);
        }
        
    } ,[ avatar ]);

    const onDrop = useCallback( acceptedFiles=>{
        const file = acceptedFiles[0];
        setAvatar({ file, preview: URL.createObjectURL( file ) })
    }, [ setAvatar ] );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        accept      : "image/jpeg, image/png",
        noKeyboard  : true,
        onDrop
     });

     return(
         <div className = "upload-avatar" {...getRootProps()}>
             <input { ...getInputProps() } />
                { isDragActive? 
                   <Avatar size ={150} src = {NoAvatar}/>
                   : 
                   <Avatar size ={150} src = { avatarUrl? avatarUrl: NoAvatar }/>
                }
         </div>
     );
}

const EditForm = ({ userData, setUserData, updateUser }) =>{
    const { Option } = Select;
    return (
        <Form className = "form-edit" onSubmitCapture = { updateUser }>
            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input 
                            prefix= {<UserOutlined/>}
                            placeholder = "Nombre"
                            value = { userData.name }
                            onChange = { e => setUserData({ ...userData, name: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                    <Form.Item>
                        <Input 
                            prefix= {<UserOutlined/>}
                            placeholder = "Last Name"
                            value = { userData.lastname }
                            onChange = { e => setUserData({ ...userData, lastname: e.target.value }) }
                        />
                    </Form.Item>
                    
                </Col>
            </Row>

            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input 
                            prefix= {<MailOutlined/>}
                            placeholder = "Corre electronico"
                            value = { userData.email }
                            onChange = { e => setUserData({ ...userData, email: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                <Form.Item>
                    <Select
                        placeholder="Selecciona un rol"
                        onChange = { e=> setUserData({ ...userData,  role: e } ) }
                        value = { userData.role }
                    >
                        <Option value = "admin"> Administrador </Option>
                        <Option value = "editor"> Editor </Option>
                        <Option value = "reviewer"> Revisor </Option>
                    </Select>
                </Form.Item>
                    
                </Col>
            </Row>

            <Row gutter = {24}>
                <Col span = {12}>
                    <Form.Item>
                        <Input 
                            prefix= { <LockOutlined/> }
                            type = "password"
                            placeholder = "Contraseña"
                            onChange = { e => setUserData({ ...userData, password: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
                <Col span = {12}>
                <Form.Item>
                        <Input 
                            prefix= { <LockOutlined/> }
                            type = "password"
                            placeholder = "Repetir Contraseña"
                            onChange = { e => setUserData({ ...userData, repeatPassword: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button 
                    type = "primary" 
                    htmlType = "submit"
                    className = "btn-submit"
                >
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}

// Export
export default function EditUserForm( { user, setIsVisibleModal, setReloadUsers } ){
    // States
    const [ formAvatar, setFormAvatar] = useState(null);
    const [ userData, setUserData] = useState({});

    useEffect( ()=> {
        setUserData({
            name    : user.name,
            lastname: user.lastname,
            email   : user.email,
            role    : user.role,
            avatar  : user.avatar,
        })
    } ,[ user ]);

    useEffect( () =>{
        if ( user.avatar ) {
            getAvatarApi( user.avatar ).then( response =>{
                setFormAvatar ( response );                
            });
        }else{
            setFormAvatar(null);
        }
    } ,[user.avatar]);

    useEffect( () =>{
        if ( formAvatar ) {
            setUserData({...userData, avatar: formAvatar.file });
        }
    }, [ formAvatar ]);
    // funcion para actualizar usuario
    const updateUser = e => {
        e.preventDefault();
        const token = getAccesTokenApi();
        let userUpdate = userData;
        if ( userUpdate.password || userUpdate.repeatPassword ) {
            if ( userUpdate.password !== userUpdate.repeatPassword ) {
                notification["error"]({ message: "Las contraselas deben ser iguales" });
                return;
            }else{
                delete userUpdate.repeatPassword;
            }
        } 
        
        if ( !userUpdate.name || !userUpdate.lastname  || !userUpdate.email ) {
            notification["error"]({ message: "El nombre apellidos y email son obligatorios" });
            return;
        }

        if ( typeof userUpdate.avatar === "object" ) {
            uploadAvatarApi( token, userUpdate.avatar, user._id).then( response =>{
                userUpdate.avatar = response.avatarName;
                updateUserApi( token, userUpdate, user._id).then( result => {
                    notification["success"]({ 
                        message : result.message
                     });
                }) ;
            }); 
            setReloadUsers (true) ;
        }else{
            updateUserApi( token, userUpdate, user._id).then( result => {
                notification["success"]({ 
                    message : result.message
                 });
            });
            setReloadUsers (true) ;
        }
        setUserData( userUpdate );
        setIsVisibleModal (false);
    }
    
    
    return(
        <div className = "edit-user-form">
            <UploadAvatar  
                avatar = {formAvatar} 
                setAvatar= {setFormAvatar}
            />
            <EditForm
                userData ={ userData }
                setUserData={ setUserData }
                updateUser = { updateUser }
            />
        </div>
        
    );
}