import React, { useState } from 'react';
import { Form, Input, Select, notification, Button } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { addMenuApi }  from '../../../../api/menu';
import { getAccesTokenApi }  from '../../../../api/auth';
import './AddMenuWebForm.scss';

export default function AddMenuWebForm ({ setIsVisibleModal, setReloadMenuWeb }) {
    const [ menuWebData, setMenuWebData ] = useState ({}); 
    // functions
    const addMenu =event => {
        event.preventDefault();
        let finalData = {
            title: menuWebData.title,
            url: ( menuWebData.http ? menuWebData.http : "http://" )+ menuWebData.url 
        }
        if ( !finalData.title || !finalData.url || !menuWebData.http ) {
            notification['error']({  message : "Todos los campos son obligatorios." });
        } else {
            const accesToken = getAccesTokenApi();
            finalData.active = false;
            finalData.order = 1000;

            addMenuApi ( accesToken, finalData )
                .then ( response => {
                    notification['success']({
                        message: response
                    });
                    setIsVisibleModal( false );
                    setReloadMenuWeb( true );
                    setMenuWebData ( {} );
                    finalData = {};
                } )
                .catch( ()=>{
                    notification['error']({ 
                        message : "Error en el Servidor."
                    });
                } );
        }
    }

    return (
        <div className = "add-menu-web-form">
            <AddForm
                menuWebData = { menuWebData }
                setMenuWebData = { setMenuWebData }
                addMenu = { addMenu }
            />
        </div>
    );
}


function AddForm ( { menuWebData, setMenuWebData, addMenu } ) {
    const { Option } = Select;

    const selecBefore = (
        <Select
            defaultValue = "http://"
            style = {{ width: 90 }}
            onChange = { e => { setMenuWebData({ ...menuWebData, http: e }) }}
        >
            <Option value = "http://">http://</Option>
            <Option value = "https://">https://</Option>
        </Select>
    );
    return (
        <Form className = "form-add" onSubmitCapture = { addMenu }>
            <Form.Item>
                <Input
                    prefix = { <FontSizeOutlined/> }
                    placeholder = "Titulo"
                    value = { menuWebData.title }
                    onChange = { e => { setMenuWebData({ ...menuWebData, title: e.target.value }) } }
                />
            </Form.Item>

            <Form.Item>
                <Input
                    addonAfter = { selecBefore }
                    placeholder = "URL"
                    value = { menuWebData.url }
                    onChange = { e => { setMenuWebData({ ...menuWebData, url: e.target.value }) } }
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type = "primary" 
                    htmlType ="submit"
                    className = "btn-submit"
                > 
                    Crear Menu
                </Button>
            </Form.Item>
        </Form>
    );
}