import React, { useState } from 'react';
import {} from'antd';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { signUpAdminApi } from '../../../../api/user';
import { getAccesTokenApi } from '../../../../api/auth'
import "./AddUserForm.scss";


function AddForm ({ userNewData , setUserNewData, addUser} ) {
    const { Option } = Select;
   

    return(
        <Form className = "form-add" onSubmitCapture = { addUser }>
            <Row gutter = { 24 }>
                <Col span = { 12 }>
                    <Form.Item>
                        <Input
                            prefix = { <UserOutlined/> }
                            placeholder = "Nombre"
                            value = { userNewData.name }
                            onChange = { e => setUserNewData( {...userNewData, name: e.target.value} )  }
                        />
                    </Form.Item>
                </Col>
                <Col span = { 12 }>
                    <Form.Item>
                        <Input
                            prefix = { <UserOutlined/> }
                            placeholder = "Apellidos"
                            value = { userNewData.lastname }
                            onChange = { e => setUserNewData({ ...userNewData, lastname: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter = { 24 }>
                <Col span = { 12 }>
                    <Form.Item>
                        <Input
                            prefix = { <MailOutlined/> }
                            placeholder = "E-mail"
                            value = { userNewData.email }
                            onChange = { e => setUserNewData ({ ...userNewData, email: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
                <Col span = { 12 }>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange = { e=> setUserNewData({ ...userNewData,  role: e } ) }
                            value = { userNewData.role }
                        >
                            <Option value = "admin"> Administrador </Option>
                            <Option value = "editor"> Editor </Option>
                            <Option value = "reviewer"> Revisor </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter = { 24 }>
                <Col span = { 12 }>
                    <Form.Item>
                        <Input
                            prefix = { <LockOutlined/> }
                            type = "password"
                            placeholder = "Password"
                            value = { userNewData.password }
                            onChange = { e => setUserNewData ({ ...userNewData, password: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
                <Col span = { 12 }>
                    <Form.Item>
                        <Input
                            prefix = { <LockOutlined/> }
                            type = "password"
                            placeholder = "Password"
                            value = { userNewData.repeatPassword }
                            onChange = { e => setUserNewData ({ ...userNewData, repeatPassword: e.target.value }) }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type = "primary" htmlType = "submit" className = "btn-submit">
                    Crear usuruio
                </Button>
            </Form.Item>
        </Form>
    );
}

export default function AddUserForm  ({ setIsVisibleModal, setReloadUsers })  {
    const [ userNewData , setUserNewData ] = useState({});

    const addUser = event =>{
        event.preventDefault();
        if ( !userNewData.name || 
            !userNewData.lastname || 
            !userNewData.email || 
            !userNewData.role || 
            !userNewData.password || 
            !userNewData.repeatPassword
            ) {
            notification['error']({ message: 'todos los campos son obligatorios'});
        } else if ( userNewData.password !== userNewData.repeatPassword ) {
            notification['error']({ message: 'El password es diferente'});
        } else{
            const accesToken = getAccesTokenApi();
            signUpAdminApi (accesToken, userNewData )
            .then( response =>{
                notification['success']({ message: response});
                setIsVisibleModal( false );
                setReloadUsers ( true );
                setUserNewData ({});
            } )
            .catch( err => {
                notification['error']({ message: err });
            } );
        }
    }
    return ( 
        <div className = "add-user-form">
            <AddForm
                userNewData = { userNewData }
                setUserNewData = { setUserNewData }
                addUser     = { addUser }
            />
        </div>

     );
}
 
 ;