import React from 'react';
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { getAccesTokenApi } from '../../../../api/auth';
import { deletePostApi, getPostsApi } from '../../../../api/post';

const { confirm } = ModalAntd;
export default function PostsList({ posts, setReloadPosts, editPost }) {
 
    const deletePost = post =>{
        const accesToken = getAccesTokenApi();
        confirm({
            title: "Eliminando post",
            content: `¿Estas seguro de  eliminar el Post ${ post.title } ?`,
            okText: "Eliminar",
            okType : "danger",
            cancelText: "Cancelar",
            onOk() {
                deletePostApi ( accesToken, post._id )
                    .then( response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({ 
                            message: response.code === 200 ? "Post eliminado correctamente" : response.message 
                        });
                        setReloadPosts ( true );
                    } )
                    .catch(  );
            }
        });
       
        console.log( "delete post",post)
    }
    return ( 
        <div>
            <List
                dataSource = { posts }
                renderItem = { post =>  <Post 
                        post = { post } 
                        deletePost = { deletePost } 
                        editPost ={ editPost }
                    /> }
            />
        </div>
     );
}


function Post ({ post, deletePost, editPost }) {

    return (
        <List.Item
            key = { post._id }
            actions = {[
                <Link to ={ `/blog/${ post.url }` } target = "_blank" >
                    <Button 
                        type ="primary"
                    >
                        <EyeOutlined/>
                    </Button>
                </Link>
                ,
                <Button type = "primary" onClick = { () => editPost( post ) }>
                    <EditOutlined/>
                </Button>,
                <Button 
                    type = "danger"  onClick = { () => deletePost ( post ) }>
                    <DeleteOutlined/>
                </Button>
            ]}
        >
                <List.Item.Meta title = { post.title }/>
        </List.Item>
    );
}
 
