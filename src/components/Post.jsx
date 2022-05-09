import React, { useState } from 'react';
import Axios from 'axios'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, user, updatePost }) => {
	// console.log(postInfo)
	let { _id, title, post, score, authorName, featured, date } = postInfo
	date = new Date(date)
		.toLocaleDateString('en-us',
			{ weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
		)

	const [stateScore, setStateScore] = useState(score)
	const [stateFeatured, setStateFeatured] = useState(featured)

	const handleMakeFeatured = async () => {
		const url = `${API_URL}/posts/updateFeatured/${_id}`
		const info = { busi: postInfo.business }
		const originalStatus = stateFeatured
		try {
			await Axios.put(url, info)
				.then((res) => {
					setStateFeatured(!originalStatus)
				});
		} catch (err) {
			console.log("Error while attempting featured change");
		} finally {
			updatePost(_id, false, !originalStatus)
		}
	}

	const sendAdminScoreChange = async (upvote) => {
		const url = `${API_URL}/posts/updateScore/admin/${_id}`
		const info = { upvote }
		let newScore;
		try {
			await Axios.put(url, info)
				.then((res) => {
					newScore = res.data.newScore
					setStateScore(newScore)
				});
		} catch (err) {
			console.log("Error while attempting admin score change");
		} finally {
			updatePost(_id, true, newScore)
		}
	}

	const sendScoreChangeReq = async (upvote) => {
		if (admin) {
			sendAdminScoreChange(upvote);
			return;
		}
		const url = `${API_URL}/posts/updateScore/${_id}`
		const info = { upvote, user }
		let newScore;
		try {
			await Axios.put(url, info) 
				.then((res) => {
					newScore = res.data.newScore
					setStateScore(newScore)
				});
		} catch (err) {
			console.log("Error while attempting score change");
		} finally {
			updatePost(_id, true, newScore)
		}
	}

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
						<Button className="post-button-arrow" onClick={() => sendScoreChange(true, _id)}>up</Button>
						<span className="post-score">{score}</span>
						<Button className="post-button-arrow" onClick={() => sendScoreChange(false, _id)}>down</Button>
					</Col>
				</Row>
			</Card>

		</>
	)
}

export default Post;