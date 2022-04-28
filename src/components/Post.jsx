import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

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
						<h2>{title}</h2>
						<h5>{authorName}</h5>
						<p>{post}</p>
						<p>{`score: ${score}`}</p>
						<p>{featured ? 'featured' : 'not featured'}</p>
						<p>{date}</p>
						{admin && <Button onClick={() => handleMakeFeatured(_id)}>Make featured</Button>}
						<br />
					</Col>
					<Col xs="2" className="my-auto justify-content-center">
						<Button className="post-button-arrow" onClick={() => sendScoreChangeReq(true)}>⬆️</Button>
						<span className="post-score">{stateScore}</span>
						<Button className="post-button-arrow" onClick={() => sendScoreChangeReq(false)}>⬇️</Button>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export default Post;