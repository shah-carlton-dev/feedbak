import React from 'react';
import {Card} from 'react-bootstrap';
const Post = (postInfo) => {
    const title = postInfo.postInfo.title;
    const post = postInfo.postInfo.post;
    const score = postInfo.postInfo.score;
    const author = postInfo.postInfo.author;
    const featured = postInfo.postInfo.featured;
    const date = postInfo.postInfo.date;
    return(
        <>
        <Card className='p-4'>
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{post}</p>
            <p>{score}</p>
            <p>{featured}</p>
            <p>{date}</p>
        </Card>

        </>
    )
}

export default Post;