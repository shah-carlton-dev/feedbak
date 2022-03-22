import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import {API_URL} from '../utils/constants';
import "../css/NavbarContainer.scss"
const Business = (props) => {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();    
    const getPostsData = async () => {
        const url = API_URL + '/posts/all/' + id;
        try {
            await Axios.get(url).then(res => setPosts(res.data));
        } catch (err) {
            console.log("error retrieving posts list");
        }
    }
    useEffect(()=> {
        getPostsData();
    },[]);
    // const testPosts = [{title: 'post 1', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john doe', score: 100}, {title: 'post 2', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john does', score: 90}, {title: 'post 3', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john doe', score: -10}]
    return (
        <div className="background-color">
            <Container className="background-color">
                <h1 className="text-center">Business!</h1>
                <Row xs={1} md={2} className="">
                    {posts.map((info, idx) => (
                        <Col key={idx} className="py-3 px-5">
                        <Post key={idx} postInfo={info}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Business;
