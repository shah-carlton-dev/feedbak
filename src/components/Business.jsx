import React from 'react';
import {useParams} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Post from './Post';

const Business = (props) => {
    const { id } = useParams();
    // get business feed by ID!
    const testPosts = [{title: 'post 1', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john doe', score: 100}, {title: 'post 2', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john does', score: 90}, {title: 'post 3', post: 'asdf asdf asdf asdf asdf asdf asdf', author: 'john doe', score: -10}]
    return (
        <>
        <h1>Business!</h1>
        <Row xs={1} md={2} className="">
            {testPosts.map((info, idx) => (
                <Col className="py-3 px-5">
                <Post key={idx} postInfo={info}/>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default Business;
