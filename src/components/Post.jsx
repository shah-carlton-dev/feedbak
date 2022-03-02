import React from 'react';
import {Card} from 'react-bootstrap';
const Post = (postInfo) => {
    const title = postInfo.postInfo.title;
    const post = postInfo.postInfo.post;
    const score = postInfo.postInfo.score;
    const author = postInfo.postInfo.author;
    return(
        <>
        <Card>
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{post}</p>
            <p>{score}</p>
        </Card>

        </>
    )
}

export default Post;