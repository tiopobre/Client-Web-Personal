import React from 'react';
import { Row, Col } from 'antd';
import { useParams, withRouter } from 'react-router-dom';
import PostListWeb from '../components/Web/Blog/PostListWeb';
export default function Blog ({ location, history }) {
    const { url } = useParams();    
    console.log(url);
    return ( 
        <Row>
            <Col md = {4}/>
            <Col md = {16}>
                { url ?
                    "Post Infi ..."
                    :
                    <PostListWeb
                        location = { location }
                        history = { history }
                    />
                }
            </Col>
            <Col md = {4}/>
        </Row>
     );
}