import React, { useState } from 'react';
import Axios from 'axios'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, handleMakeFeatured, sendScoreChange }) => {
	// console.log(postInfo)
	let { _id, title, post, score, authorName, featured, date } = postInfo
	date = new Date(date)
		.toLocaleDateString('en-us',
			{ weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
		)

	return (
		<>
			<Card className="p-4 post-style">
				<Row>
					<Col xs="10">
						<h5>{title}</h5> 
						<h5>{authorName}</h5>
						<p>{post}</p>
						<p>{featured ? 'featured' : 'not featured'}</p>
						<p>{date}</p>
						{admin && <Button onClick={() => handleMakeFeatured()}>Make featured</Button>}
						<br />
					</Col>
					<Col xs="2" className="my-auto justify-content-center">
						<Button className="post-button-arrow" onClick={() => sendScoreChange(true, _id)}>⬆️</Button>
						<span className="post-score">{score}</span>
						<Button className="post-button-arrow" onClick={() => sendScoreChange(false, _id)}>⬇️</Button>
					</Col>
				</Row>
			</Card>

		</>
	)
}

export default Post;