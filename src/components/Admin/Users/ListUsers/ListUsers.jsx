import React, { useState, useEffect } from 'react';
import { List, Switch, Avatar, Button, notification, Modal as antModal } from 'antd'
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { getAvatarApi, activateUserApi, deleteteUserApi }  from '../../../../api/user';
import { getAccesTokenApi } from '../../../../api/auth';

import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';
//
import './ListUsers.scss';

const { confirm } = antModal;

const UsersActive= ({ usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers }) =>{
    const editUser = user  => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${ user.name? user.name :"..." } ${ user.lastname? user.lastname : "..." }`);
        setModalContent(
            <EditUserForm 
                user = {user} 
                setIsVisibleModal = { setIsVisibleModal }
                setReloadUsers =  { setReloadUsers }
            />
        );
    } 
    return (
        <List
            className = "users-active"
            itemLayout = "horizontal"
            dataSource = { usersActive }
            renderItem = { user => ( <UserActive user={user} editUser = {editUser} setReloadUsers = { setReloadUsers } /> )}        
        />
    );    
} 

function UserActive ({ user, editUser, setReloadUsers }){
    const [ avatar, setAvatar ] = useState( null );
    useEffect( () =>{
        if ( user.avatar ) {
            getAvatarApi( user.avatar ).then ( response=>{
                setAvatar( response );
            } );
        } else {
            setAvatar( null );
        }
     } , [ user ] );

     const desactivateUser =  () =>{
         const accesToken = getAccesTokenApi();

         activateUserApi ( accesToken, false, user._id)
            .then( response => {
                notification["success"]({ 
                    message : response.message
                 });
            })
            .catch( err =>{
                notification["error"]({ message : err });
            } );
        setReloadUsers( true );
     }

     const showDeleteConfirm = () => {
        const accesToken = getAccesTokenApi();

        confirm( {
            title: "Eliminando usuario",
            contentt: `¿Esta seguro que quiere eliminar a ${ user.email} ?`,
            okText: "Eliminar !",
            okType: "danger",
            cancelText : "Cancelar",
            onOk(){
                deleteteUserApi( accesToken, user._id)
                .then( response=>{
                    notification["success"]({ 
                        message : response.message
                     });
                     setReloadUsers( true );
                } )
                .catch( err => {
                    notification["error"]({ 
                        message : err
                     });
                } );
            }
        } );
     }

     return(
        <List.Item key={user.id}
                actions = {[
                <Button
                    type= "primary"
                    onClick = { () => { editUser(user) } } 
                >
                    <EditOutlined/>
                </Button>,
                <Button
                    type= "danger"
                    onClick = { desactivateUser }
                >
                    <StopOutlined/>
                </Button>,
                <Button
                    type= "danger"
                    onClick = { showDeleteConfirm }
                >
                    <DeleteOutlined/>
                </Button>,
            ]}
        >
            <List.Item.Meta
                avatar = {<Avatar src={ avatar? avatar : NoAvatar} /> }
                title = { `
                    ${ user.name ? user.name : '...'}
                    ${ user.lastname? user.lastname : '...'}
                ` }
                description = {user.email}
            />
        </List.Item>
     );
}

const UsersInactive= ( { usersInactive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } ) =>{
    return (
        <List
            className = "users-active"
            itemLayout = "horizontal"
            dataSource = { usersInactive }
            renderItem = { user => ( <UserInactive user = { user } setReloadUsers = { setReloadUsers }/> )}        
        />
    );
}

function UserInactive ({ user, setReloadUsers }){
    const [ avatar, setAvatar ] = useState( null );
    useEffect( () =>{
        if ( user.avatar ) {
            getAvatarApi( user.avatar ).then ( response=>{
                setAvatar( response );
            } );
        } else {
            setAvatar( null );
        }
     } , [ user ] );

     const activateUser =  () =>{
        const accesToken = getAccesTokenApi();

        activateUserApi ( accesToken, true, user._id)
           .then( response => {
               notification["success"]({ 
                   message : response.message
                });
           })
           .catch( err =>{
               notification["error"]({ message : err });
           } );
       setReloadUsers( true );
    }

    const showDeleteConfirm = () => {
        const accesToken = getAccesTokenApi();

        confirm( {
            title: "Eliminando usuario",
            contentt: `¿Esta seguro que quiere eliminar a ${ user.email} ?`,
            okText: "Eliminar !",
            okType: "danger",
            cancelText : "Cancelar",
            onOk(){
                deleteteUserApi( accesToken, user._id)
                .then( response=>{
                    notification["success"]({ 
                        message : response.message
                     });
                     setReloadUsers( true );
                } )
                .catch( err => {
                    notification["error"]({ 
                        message : err
                     });
                } );
            }
        } );
     }

     return(
        <List.Item key={user.id}
                actions = {[
                    <Button
                        type= "primary"
                        onClick = { activateUser }
                    >
                        <CheckOutlined/>
                    </Button>,
                    
                    <Button
                        type= "primary"
                        onClick = { showDeleteConfirm }
                    >
                        <DeleteOutlined/>
                    </Button>,
                ]}
            >
            <List.Item.Meta
                avatar = {<Avatar src={ avatar? avatar : NoAvatar} /> }
                title = { `
                    ${ user.name ? user.name : '...'}
                    ${ user.lasname? user.lastname : '...'}
                ` }
                description = {user.email}
            />
        </List.Item>
     );
}

export default function ListUsers  ({ usersActive, usersInactive, setReloadUsers }) {
    const [ viewUsersActive, setViewUsersActive] = useState(true);
    const [ isVisibleModal, setIsVisibleModal ] = useState( false );
    const [ modalTitle, setModalTitle] = useState( "" );
    const [ modalContent, setModalContent] = useState( null );
    
    const addUserModal = () =>{
        setIsVisibleModal( true );
        setModalTitle ( 'Creando nuevo usuasrio' );
        setModalContent(
            <div>
                <AddUserForm
                    setIsVisibleModal = { setIsVisibleModal }
                    setReloadUsers = { setReloadUsers }
                />
            </div>
        );
        console.log('añadir usuario...') 
    }
    
    return ( 
        <div className = "list-users">
            <div className = "list-users__header">
                <div className = "list-users__header-switch">
                     <Switch
                         defaultChecked
                         onChange = { () => setViewUsersActive(!viewUsersActive)}
                     /> 
                     <span>{ viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
                </div>
                <Button 
                    type = "primary"
                    onClick = { addUserModal }
                >
                    Nuevo Usuario
                </Button>
            </div>
            
            <div>
                { viewUsersActive ? 
                     <UsersActive 
                         usersActive     = { usersActive } 
                         setModalTitle   ={ setModalTitle }
                         setIsVisibleModal    = {setIsVisibleModal}
                         setModalContent = {setModalContent}
                         setReloadUsers = { setReloadUsers }
                     />

                     : <UsersInactive 
                         usersInactive     = { usersInactive } 
                         setModalTitle   ={ setModalTitle }
                         setIsVisibleModal    = {setIsVisibleModal}
                         setModalContent = {setModalContent}
                         setReloadUsers = { setReloadUsers }
                     />
                 }
            <Modal
                title = { modalTitle }
                isVisible = { isVisibleModal }
                setIsVisible = { setIsVisibleModal }
            >
                { modalContent }
            </Modal>
           </div>
        </div>
     );
}