import React, { useState } from 'react';
import SuggestLoginModal from './SuggestLoginModal'
import { Card, Button, ToggleButton, ButtonGroup, Row, Col } from 'react-bootstrap';
import { API_URL } from "../utils/constants";

const Post = ({ postInfo, admin, user, handleMakeFeatured, sendScoreChange, inProfile }) => {
	let { _id, title, post, score, authorName, featured, date } = postInfo
	date = new Date(date)
		.toLocaleDateString('en-us',
			{ weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
		)

	const [stateScore, setStateScore] = useState(score)
	const [stateFeatured, setStateFeatured] = useState(featured)
	const [voteStatus, setVoteStatus] = useState((postInfo.upvoters.includes(user)) ? 1 : ((postInfo.downvoters.includes(user)) ? -1 : 0))
	const [suggestLogin, setSuggestLogin] = useState(false)

	const updateScore = (newScore) => {
		setStateScore(newScore)
	}

	const updateFeatured = (isFeatured) => {
		setStateFeatured(isFeatured)
	}


	const handleButtonClick = (upvote, id, scoreUpdateFn) => {
		if (!user) {
			setSuggestLogin(true);
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
				<Card.Body>
					<Row>
						<Col md="9" sm={12}>
							<h4>{title}&nbsp;&nbsp;{stateFeatured ? <i className="fa-solid fa-star"></i> : ''}</h4>
							<p>{post}</p>
							<p></p>

							{admin && <Button onClick={() => handleMakeFeatured(_id, (x) => updateFeatured(x))}>Toggle featured</Button>}
							<br />
						</Col>
						<Col md="3" sm={12} className="mx-auto px-0 justify-content-center text-center">
							{
								inProfile ?
									<span className="post-score">{stateScore}</span>
									:
									<ButtonGroup >
										<ToggleButton className={`post-button-arrow ${voteStatus < 1 ? 'not-selected' : ''}`} onClick={() => handleButtonClick(true, _id, (x) => updateScore(x))} checked={voteStatus === 1}><i className="fa-solid fa-angle-up"></i></ToggleButton>
										&nbsp;<span className="post-score">{stateScore}</span>&nbsp;
										<ToggleButton className={`post-button-arrow ${voteStatus > -1 ? 'not-selected' : ''}`} onClick={() => handleButtonClick(false, _id, (x) => updateScore(x))} checked={voteStatus === -1}><i className="fa-solid fa-angle-down"></i></ToggleButton>
									</ButtonGroup>
							}
						</Col>

					</Row>
				</Card.Body>
				<Card.Footer className="text-center">
					<Row>
						<Col xl={6} md={12}>
							{authorName}
						</Col>
						<Col xl={6} md={12}>
							{date}
						</Col>
					</Row>
				</Card.Footer>
			</Card>
			<SuggestLoginModal
				show={suggestLogin}
				onHide={() => setSuggestLogin(false)}
				message={"Join or sign in to vote on existing Feedbak!"}
			/>
		</>
	)
}

export default Post;