import React, { useState } from 'react';
import Axios from 'axios'
import { Card, Button, ToggleButton, ButtonGroup, Row, Col } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, user, handleMakeFeatured, sendScoreChange, inProfile }) => {
	// console.log(postInfo)
	let { _id, title, post, score, authorName, featured, date } = postInfo
	date = new Date(date)
		.toLocaleDateString('en-us',
			{ weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
		)

	const [stateScore, setStateScore] = useState(score)
	const [stateFeatured, setStateFeatured] = useState(featured)
	const [voteStatus, setVoteStatus] = useState((postInfo.upvoters.includes(user)) ? 1 : ((postInfo.downvoters.includes(user)) ? -1 : 0))

	const updateScore = (newScore) => {
		setStateScore(newScore)
	}

	const updateFeatured = (isFeatured) => {
		setStateFeatured(isFeatured)
	}


	const handleButtonClick = (upvote, id, scoreUpdateFn) => {
		if (!user) {
			// TODO: sign up or log in to vote on existing feedbak
			return
		}
		if (((voteStatus > 0 && upvote) || (voteStatus < 0 && !upvote)) && !admin) {
			setVoteStatus(0)
		} else if (voteStatus > -1 && !upvote) {
			setVoteStatus(-1)
		} else if (voteStatus < 1 && upvote) {
			setVoteStatus(1)
		}
		sendScoreChange(upvote, id, scoreUpdateFn)
	}

	return (
		<>
			<Card className="p-4 post-style">
				<Row>
					<Col xl="10">
						<h4>{title}&nbsp;&nbsp;{stateFeatured ? <i className="fa-solid fa-star"></i> : ''}</h4>
						<h5>{authorName}</h5>
						<p>{post}</p>
						<p></p>
						<p>{date}</p>
						{admin && <Button onClick={() => handleMakeFeatured(_id, (x) => updateFeatured(x))}>Toggle featured</Button>}
						<br />
					</Col>
					<Col xs="2" className="my-auto justify-content-center">
						{
							inProfile ?
								<span className="post-score">{stateScore}</span>
								:
								<ButtonGroup>
									<ToggleButton className={`post-button-arrow ${voteStatus < 1 ? 'not-selected' : ''}`} onClick={() => handleButtonClick(true, _id, (x) => updateScore(x))} checked={voteStatus === 1}><i className="fa-solid fa-angle-up"></i></ToggleButton>
									&nbsp;<span className="post-score">{stateScore}</span>&nbsp;
									<ToggleButton className={`post-button-arrow ${voteStatus > -1 ? 'not-selected' : ''}`} onClick={() => handleButtonClick(false, _id, (x) => updateScore(x))} checked={voteStatus === -1}><i className="fa-solid fa-angle-down"></i></ToggleButton>
								</ButtonGroup>
						}
					</Col>

				</Row>
			</Card>

		</>
	)
}

export default Post;