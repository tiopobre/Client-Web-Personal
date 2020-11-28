import React, { useState,m, useEffect } from 'react';
import { Spin, List, notification } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";
import "moment/locale/es";
//
import './PostListWeb.scss';

export default function PostListWeb ({ location, history }) {
    const [ posts, setPosts ] = useState ( null );
    const { page = 1 } = queryString.parse( location.search );

    useEffect( () => {
        getPostsApi( 10, page)
            .then( response=> {
                if ( response?.code !== 200 ) {
                    notification["warning"]({ message: response.message });
                } else {
                    setPosts( response.posts );
                }
            } )
            .catch( error => notification["error"]({ message: error }) );
    } , [ page ]);
    if ( !posts ) {
        return(
            <Spin 
                tip = "cargando"
                style = {{ width : "100%", padding: "200px 0" }}/
            >
        );
    }
    return ( 
        <>
            <Helmet>
                    <title> Blog | Daniel Serrano </title>
                </Helmet>
            <div className = "post-list-web">
                <h1>Blog</h1>
                <List
                    dataSource = { posts.docs }
                    renderItem = { post => <Post post = { post }/> }
                />
                <Pagination
                    posts={ posts }
                    location = { location }
                    history = { history }
                />
            </div>
        </>
     );
}

function Post({ post }) {
    
    const day = moment( post.date ).format( "Do" );
    const month = moment ( post.date ).format ( "MMMM" );
    return (
        <List.Item className = "post">
            <div className = "post__date">
                <span>{ day }</span>
                <span>{ month }</span>
            </div>
            <Link to = { `blog/${ post.url }` }>
                <List.Item.Meta className = "post__title" title = { post.title }/>
            </Link>     
        </List.Item>
    );
}
 
