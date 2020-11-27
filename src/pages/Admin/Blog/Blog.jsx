import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Modal from '../../../components/Modal';
import PostsList from '../../../components/Admin/Blog/PostsList';
import Pagination from '../../../components/Pagination';
import AddEditPostForm from '../../../components/Admin/Blog/AddEditPostForm';
import { getPostsApi } from '../../../api/post';
//
import './Blog.scss';
function  Blog ( { location, history } ) {
    const [ modalTitle, setModalTitle ]         = useState("");
    const [ modalContent, setModalContent ]     = useState(null);
    const [ isVisibleModal, setIsVisibleModal ] = useState(false);
    const [ posts, setPosts ]                   = useState( null );
    const [ reloadPosts, setReloadPosts ]       = useState(false);
    const { page = 1 } = queryString.parse( location.search );

    useEffect( () =>{
        getPostsApi( 10, page )
        .then( response =>{
            if ( response?.code !== 200 ) {
                notification["warning"]({ message: response.message })
            } else {
                setPosts( response.posts );
            }
        })
        .catch( err => notification["error"]({ message: err }) ) ;
        setReloadPosts( false );
    } , [ page, reloadPosts ] );
    
    const addPost = () => {
        setIsVisibleModal( true );
        setModalTitle ( "Creando nuevo post" );
        setModalContent( <AddEditPostForm
            setIsVisibleModal = { setIsVisibleModal }
            setReloadPosts = { setReloadPosts }
            post = { null }
        /> );
    }
    const editPost = post => {
        setIsVisibleModal( true );
        setModalTitle ( `Editando post ${ post.title }` );
        setModalContent( <AddEditPostForm
            setIsVisibleModal = { setIsVisibleModal }
            setReloadPosts = { setReloadPosts }
            post = { post }
        /> );
    }

    if( !posts ){
        return null;
    }
    return ( 
        <div className = "blog">
            <div className = "blog__add-post">
                <Button
                    type = "primary"
                    onClick = { addPost }
                >Nuevo Post</Button>
            </div>
            <div>
                <PostsList
                    posts = { posts.docs }
                    setReloadPosts = { setReloadPosts }
                    editPost = { editPost }
                />
                <Pagination
                    posts = { posts }
                    location = { location }
                    history = { history }
                />
                <Modal
                    title = { modalTitle }
                    isVisible = { isVisibleModal }
                    setIsVisible = { setIsVisibleModal }
                    width = "75%"
                >
                    { modalContent }
                </Modal>
            </div>
        </div>
     );
}
 
export default withRouter ( Blog );