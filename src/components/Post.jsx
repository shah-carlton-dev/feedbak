import React, { useState } from 'react';
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, user }) => {
	// console.log(postInfo)
	let { _id, title, post, score, author, featured, date } = postInfo

	const [stateScore, setStateScore] = useState(score)
	const [stateFeatured, setStateFeatured] = useState(featured)

	const handleMakeFeatured = async () => {
		const url = `${API_URL}/posts/updateFeatured/${_id}`
		const info = { busi: postInfo.business }
		try {
			await Axios.put(url, info)
				.then((res) => {
					// console.log(res)
					setStateFeatured(!stateFeatured)
				});
		} catch (err) {
			console.log("Error while attempting featured change");
		}
	}

	const sendAdminScoreChange = async (upvote) => {
		const url = `${API_URL}/posts/updateScore/admin/${_id}`
		const info = { upvote }
		try {
			await Axios.put(url, info)
				.then((res) => {
					// console.log(res)
					setStateScore(res.data.newScore)
				});
		} catch (err) {
			console.log("Error while attempting admin score change");
		}
	}

	const sendScoreChangeReq = async (upvote) => {
		if (admin) {
			sendAdminScoreChange(upvote);
			return;
		}
		const url = `${API_URL}/posts/updateScore/${_id}`
		const info = { upvote, user }
		try {
			await Axios.put(url, info)
				.then((res) => {
					// console.log(res)
					setStateScore(res.data.newScore)
				});
		} catch (err) {
			console.log("Error while attempting score change");
		}
	}

	return (
		<>
			<Card className="p-4 post-style">
				<h2>{title}</h2>
				<h3>{author}</h3>
				<p>{post}</p>
				<p>{stateScore}</p>
				<p>{stateFeatured ? 'featured' : 'not featured'}</p>
				<p>{date}</p>
				{admin && <Button onClick={() => handleMakeFeatured()}>Toggle featured</Button>}
				<br />
				<Button onClick={() => sendScoreChangeReq(true)}>Upvote</Button>
				<br />
				<Button onClick={() => sendScoreChangeReq(false)}>Downvote</Button>
			</Card>

		</>
	)
}

export default Post;