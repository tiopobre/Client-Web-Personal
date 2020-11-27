import React, {  useState, useEffect } from 'react';
import { Switch, List, Modal as  ModalAntd, notification, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';
// ENDPOINTS
import { updateMenuApi, activateMenuApi, deleteMenuApi } from '../../../../api/menu';
import { getAccesTokenApi } from '../../../../api/auth';
//
import './MenuWebList.scss'; 
const { confirm } = ModalAntd;


export default function MenuWebList ({ menus, setReloadMenuWeb }) {
    const [ listItems, setListItems ] = useState( [] );
    const [ isVisibleModal, setIsVisibleModal ] = useState( false );
    const [ modalTitle, setModalTitle ] = useState( "" );
    const [ modalContent, setModalContent ] = useState( null );

    useEffect ( () => {
        const listItemsArray = [];
        menus.forEach( element => {
          listItemsArray.push({ 
              content: ( <MenuItem 
                    item = { element } 
                    activateMenu = { activateMenu }
                    editMenuWebModal = { editMenuWebModal }
                    deleteMenu = { deleteMenu }
                />)
           })   
        });
        setListItems ( listItemsArray );
    },[ menus ]);

    const activateMenu = ( menu, status ) =>{
        const accesToken = getAccesTokenApi();
        activateMenuApi( accesToken, menu._id, status )
        .then( response =>{
            notification['success']({ message: response });
        } )
    }
    const onSort = ( sortedList, dropEvent ) =>{
        const accesToken = getAccesTokenApi();
        sortedList.forEach( item =>{
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi ( accesToken, _id, { order } );
        } )
    }

    const deleteMenu = menu =>{
        const accesToken = getAccesTokenApi();
        confirm( {
            title: `Eliminar Menu `,
            content: `Estas seguro de querer eliminar el menu : ${menu.title} ?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "cancelar",
            onOk() {
                deleteMenuApi( accesToken, menu._id )
                .then ( response => {
                    notification['success']({ message : "Eliminado", response});
                    setReloadMenuWeb( true );
                } )
                .catch( () => { notification['error']({ message : 'Error del servidor'}); });
                
            }
        } );
    }

    const addMenuWebModal = () =>{
        setIsVisibleModal( true );
        setModalTitle( "Creando nuevo menu" );
        setModalContent( 
            <AddMenuWebForm
                setIsVisibleModal = { setIsVisibleModal }
                setReloadMenuWeb = { setReloadMenuWeb }
            /> 
        );
    }

    const editMenuWebModal = menu => {
        setIsVisibleModal ( true );
        setModalTitle ( `ditando menu: ${menu.title}` );
        setModalContent ( 
            <EditMenuWebForm
                setIsVisibleModal = { setIsVisibleModal }
                setReloadMenuWeb = { setReloadMenuWeb }
                menu = { menu }
            />
         );
    }
    return ( 
        <div className = "menu-web-list">
            <div className = "menu-web-list__header">
                <Button type = "primary" onClick = { addMenuWebModal }>
                    Crear menú
                </Button>
            </div>
            <div className = "menu-web-list__items">
                <DragSortableList
                    items = { listItems }
                    onSort = { onSort }
                    type = "vertical"
                />
            </div>
            <Modal
                title = { modalTitle }
                isVisible = { isVisibleModal }  
                setIsVisible = { setIsVisibleModal }  
            >
                { modalContent }
            </Modal>
        </div>
     );
}
 
const MenuItem = ({ item, activateMenu, editMenuWebModal, deleteMenu }) =>{
    
    return(
        <List.Item actions = {[ 
            <Switch defaultChecked = { item.active } onChange = { e => activateMenu ( item, e ) }/>,
            <Button type = "primary" onClick = { ()=> { editMenuWebModal( item ) } }>
                <EditOutlined/>
            </Button>,
            <Button type = "danger" onClick = { ()=> { deleteMenu( item ) } }>
                <DeleteOutlined/>
            </Button>
         ]}>
                <List.Item.Meta
                    title = { item.title }
                    description = { item.url }
                />
        </List.Item>
    );
}

