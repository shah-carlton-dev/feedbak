import React from 'react';
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, user }) => {
	console.log(postInfo)
	let { _id, title, post, score, author, featured, date } = postInfo

	const handleMakeFeatured = async () => {
		const url = `${API_URL}/posts/updateFeatured/${_id}`
		const info = { busi: postInfo.business }
		try {
			await Axios.put(url, info)
				.then((res) => {
					console.log(res)
				});
		} catch (err) {
			console.log("Error while attempting featured change");
		}
	}

	const sendScoreChangeReq = async (upvote) => {
		const url = `${API_URL}/posts/updateScore/${_id}`
		const info = { upvote, user }
		try {
			await Axios.put(url, info)
				.then((res) => {
					console.log(res)
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
				<p>{score}</p>
				<p>{featured ? 'featured' : 'not featured'}</p>
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