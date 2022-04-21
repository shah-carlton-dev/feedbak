import React from 'react';
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin }) => {
	console.log(postInfo)
	const { _id, title, post, score, author, featured, date } = postInfo

	const handleMakeFeatured = async () => {
		console.log('make featured')
	}

	const sendScoreChangeReq = async (upvote) => {
		const url = `${API_URL}/posts/update/${_id}`
		// adjScore = upvote ? score + 1 : score - 1;
		// const info = { upvote, user: _id }
		// try {
		// 	await Axios.put(url, info)
		// 		.then((res) => {
		// 			console.log(res)
		// 			// props.onHide();
		// 		});
		// } catch (err) {
		// 	console.log("Error while attempting password change");
		// 	setErrMessage(err.response.data.message)
		// }
	}

	return (
		<>
			<Card className='p-4'>
				<h2>{title}</h2>
				<h3>{author}</h3>
				<p>{post}</p>
				<p>{score}</p>
				<p>{featured ? 'featured' : 'not featured'}</p>
				<p>{date}</p>
				{admin && <Button onClick={() => handleMakeFeatured()}>Make featured</Button>}
				<br />
				<Button onClick={() => sendScoreChangeReq(true)}>Upvote</Button>
				<br />
				<Button onClick={() => sendScoreChangeReq(false)}>Downvote</Button>
			</Card>

		</>
	)
}

export default Post;