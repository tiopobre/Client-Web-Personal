import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification} from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { updateMenuApi } from '../../../../api/menu';
import { getAccesTokenApi } from '../../../../api/auth';
//
import './EditMenuWebForm.scss';
export default function EditMenuWebForm ({ setIsVisibleModal, setReloadMenuWeb, menu }){
    const [ menuWebData, setMenuWebData ] = useState ( {} );
    
    useEffect ( ()=> {
        setMenuWebData( menu );
    } ,[ menu ]);

    const editMenu = event =>{
        event.preventDefault();

        if ( !menuWebData.title || !menuWebData.url ) {
            notification["error"]({ message: "Todos los campos son necesarios" });
        } else {
            const accesToken = getAccesTokenApi();
            updateMenuApi( accesToken, menuWebData._id, menuWebData )
                .then( response => {
                    setIsVisibleModal( false );
                    setReloadMenuWeb( true );
                    notification["success"]({ message: response });
                })
                .catch( () => {
                    notification["error"]({ message: "Error del servidor" });
                 });
            
        }
    }
    return(
        <div className = "edit-menu-web-form">
            <EditForm
                menuWebData = { menuWebData }
                setMenuWebData = { setMenuWebData }
                editMenu = { editMenu }           
            />
        </div>
    );
}


function EditForm ({ menuWebData, setMenuWebData, editMenu }) {
    return(
        <Form className = "form-edit" onSubmitCapture = { editMenu }>
            <Form.Item>
                <Input
                    prefix = { <FontSizeOutlined/>}
                    placeholder = "Titulo"
                    value = { menuWebData.title }
                    onChange = { e=> setMenuWebData({ ...menuWebData, title: e.target.value }) }
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix = { <LinkOutlined/>}
                    placeholder = "URL"
                    value = { menuWebData.url }
                    onChange = { e=> setMenuWebData({ ...menuWebData, url: e.target.value }) }
                />
            </Form.Item>
            <Form.Item>
                <Button
                    className = "btn-submit"
                    type = "primary"
                    htmlType = "submit"
                > Actualizar Menu</Button>
            </Form.Item>
        </Form>

    );
}