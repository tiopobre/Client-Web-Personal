import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formvalidation';
import { signUpApi} from '../../../api/user';
import "./RegisterForm.scss";

export default function RegisterForm (){
    // States
    const [ inputs, setInputs] = useState({
        email           : '',
        password        : '',
        repeatPassword  : '',
        privacyPolicy   : false
    });
    const [ formValid, setFormValid ] = useState({
        email           : false,
        password        : false,
        repeatPassword  : false,
        privacyPolicy   : false
    });

    // Cuando hay un cambio en el Form
    const changeForm = e=>{
        if (e.target.name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name] : e.target.checked
            });
        }else{
            setInputs({
                ...inputs,
                [e.target.name] : e.target.value
            });
        }
    }
    //validacion
    const inputValidation = e =>{
        const { type, name } = e.target;
        if( type === "email"){
            setFormValid({
                ...formValid,
                [name]: emailValidation( e.target )
            });
        }
        if( type === "password"){
            setFormValid({
                ...formValid,
                [name]: minLengthValidation( e.target, 6 )
            });
        }
        if( type === "checkbox"){
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
        
    }
    // Para registrar
    const register = async e => {
        e.preventDefault();
        const { email, password, repeatPassword, privacyPolicy } = inputs;
        // validaciones
        if ( !email|| !password || !repeatPassword || !privacyPolicy ) {
            notification['error']({
                message: 'todos los campos son obligatorios'
            });
        }else{
            if ( password !== repeatPassword) {
                notification["error"]({
                    message: 'Las contraseñas no coinciden'
                });
            }else{
                // TO DO : conectar con el API y registrar el 
                const result = await signUpApi( inputs ); // Para validar y guardar en la BD
                if ( !result.ok ) {
                    notification["error"]({
                        message: result.message
                    });
                }else{
                    notification['success']({
                        message: result.message
                    });
                    
                    refreshForm();
                }
            }
        }
    }

    const refreshForm = () => {
        const input = document.getElementsByTagName( 'input' );
        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("succes") ;
            input[i].classList.remove("error");           
        }
        setInputs({
            email           : '',
            password        : '',
            repeatPassword  : '',
            privacyPolicy   : false
        });

        setFormValid({
            email           : false,
            password        : false,
            repeatPassword  : false,
            privacyPolicy   : false
        });
    }
    
    return ( 
       <Form className = "register-form" onSubmitCapture={ register } onChange = { changeForm }>
           <Form.Item>
               <Input
                    prefix = {<UserOutlined twoToneColor = "eb2f96"/>}
                    type = "email"
                    name = "email"
                    placeholder = "Correo electronico"
                    className = "register-form__input"
                    onChange = { inputValidation }
                    value = {inputs.email}
               />
           </Form.Item>
           <Form.Item>
               <Input
                    prefix = {<LockOutlined twoToneColor = "eb2f96"/>}
                    type = "password"
                    name = "password"
                    placeholder = "Contraseña"
                    className = "register-form__input"
                    onChange = { inputValidation }
                    value = {inputs.password}
               />
           </Form.Item>
           <Form.Item>
               <Input
                    prefix = {<LockOutlined twoToneColor = "eb2f96"/>}
                    type = "password"
                    name = "repeatPassword"
                    placeholder = "Repetir Contraseña"
                    className = "register-form__input"
                    onChange = { inputValidation }
                    value = {inputs.repeatPassword}
               />
           </Form.Item>
           <Form.Item>
               <Checkbox name =  "privacyPolicy" checked = {inputs.privacyPolicy} onChange = { inputValidation }> 
                   acepto los terminos y condiciones
               </Checkbox>
           </Form.Item>
           <Form.Item>
               <Button htmlType = "submit" className = "register-form__button">
                   Crear cuenta
               </Button>
           </Form.Item>
       </Form>
     );
}
 
