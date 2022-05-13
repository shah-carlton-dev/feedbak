import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Card, ToggleButton } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'
import UserContext from "../utils/UserContext.js";

const Business = ({ user }) => {

	// variables to be used throughout component
	const [posts, setPosts] = useState([]);
	const [businessData, setBusinessData] = useState([]);
	const [showReviewModal, setShowReviewModal] = useState(false)
	const [filter, setFilter] = useState('newest')
	const partnerSinceDate = new Date(businessData.dateJoined).toLocaleDateString('en-us', { year: "numeric", month: "long" })
	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);

	// effects on page load 
	useEffect(() => {
		getPostsData();
		getBusinessData();
	}, []);

	// get requests to server
	const getPostsData = async () => {
		const url = API_URL + '/posts/all/' + id;
		try {
			await Axios.get(url).then(res => setPosts(res.data));
		} catch (err) {
			console.log("error retrieving posts list");
			console.log(err)
		}
	}
	const getBusinessData = async () => {
		const url = API_URL + '/businesses/' + id;
		try {
			await Axios.get(url).then(res => { setBusinessData(res.data); });
		} catch (err) {
			console.log("Error retrieving business list")
		}
	}

	// set requests to server
	const handleMakeFeatured = async (id, updateFeatured) => {
		const postInfo = getPostById(id)
		const url = `${API_URL}/posts/updateFeatured/${id}`
		const info = { busi: postInfo.business }
		let newStatus
		try {
			await Axios.put(url, info)
				.then((res) => {
					newStatus = res.data.isFeatured
					updateFeatured(newStatus)
				});
		} catch (err) {
			console.log(err)
			console.log("Error while attempting featured change");
		} finally {
			updatePost(id, false, newStatus)
		}
	}

	const sendAdminScoreChange = async (upvote, id, updateScore) => {
		// const postInfo = getPostById(id)
		const url = `${API_URL}/posts/updateScore/admin/${id}`
		const info = { upvote }
		let newScore;
		try {
			await Axios.put(url, info)
				.then((res) => {
					newScore = res.data.newScore
					updateScore(newScore)
				});
		} catch (err) {
			console.log("Error while attempting admin score change");
			console.log(err)
		} finally {
			updatePost(id, true, newScore)
		}
	}
	const sendScoreChange = async (upvote, id, updateScore) => {
		if (userData.user.admin) {
			sendAdminScoreChange(upvote, id, updateScore);
			return;
		}
		const url = `${API_URL}/posts/updateScore/${id}`
		const info = { upvote, user: userData.user._id }
		let newScore;
		try {
			await Axios.put(url, info)
				.then((res) => {
					newScore = res.data.newScore
					updateScore(newScore)
				});
		} catch (err) {
			console.log("Error while attempting score change");
		} finally {
			updatePost(id, true, newScore)
		}
	}

	// after get/set, update post info
	const updatePost = (id, isScore, update) => {
		let temp = [...posts]
		let post = temp.find(e => e._id === id)
		isScore ? (post.score = update) : (post.featured = update)
		let newPostsList = temp.filter(e => e._id !== id)
		newPostsList.push(post)
		newPostsList = sortPosts(filter, newPostsList)
	}

	// sort posts after getting a new list
	const sortPosts = (key, postsList) => {
		let temp = [...postsList]
		let sorted;
		if (key === 'hot') {
			sorted = temp.sort(
				(a, b) => b.score - a.score
			)
		} else if (key === 'oldest') {
			sorted = temp.sort(
				(a, b) => Date.parse(a.date) - Date.parse(b.date)
			)
		} else if (key === 'newest') {
			sorted = temp.sort(
				(a, b) => Date.parse(b.date) - Date.parse(a.date)
			)
		}
		return (sorted)
	}

	const handleNewFeedbakButton = async () => {
		if(!userData?.user?._id) {
			// TODO: sign up or log in to wrire new feedbak
			return;
		}
		setShowReviewModal(!showReviewModal)
	}

	// on filter change
	const handleFilterChange = async (key) => {
		setFilter(key);
		let new_data =  posts;
		setPosts(sortPosts(key, new_data))
	}

	// helper function to get post by id from list
	const getPostById = (id) => {
		return posts.filter(e => e._id === id);
	}

	// buttons array to be mapped
	const buttons = [
		{
			title: 'hot',
			emoji: <i className="fa-solid fa-fire-flame-curved"></i>,
		}, {
			title: 'oldest',
			emoji: <i className="fa-solid fa-arrow-trend-down"></i>,
		}, {
			title: 'newest',
			emoji: <i className="fa-solid fa-arrow-trend-up"></i>,
		}
	];

	return (
		<div className="">
			<Container className="">
				<Row className="bizHeader">
					<h1 className="text-center">{businessData.name}</h1>

				</Row>

				<Row>
					<Col xs={{order: 2}} md={{span: 9, order: 1}}  id="scroll-meeee" className="businessLeftCol">
						<Row>
							<Col className="py-3-custom px-5">
								{buttons.map((button, idx) => (
									<ToggleButton
										className="mx-2"
										key={idx}
										type="radio"
										variant="secondary"
										name="radio"
										value={button.title}
										checked={button.title == filter}
										onClick={(e) => handleFilterChange(button.title)}
									>
										{button.title} &nbsp; {button.emoji}
									</ToggleButton>
								))}
							</Col>
						</Row>
						<Row>
							{
								posts.length > 0 ?
									posts.map((info, idx) => (
										<Col xl="12" key={idx} className="py-3-custom px-5">
											<Post
												key={idx}
												postInfo={info}
												admin={userData.user.admin}
												user={userData.user._id}
												handleMakeFeatured={(id, updateFn) => handleMakeFeatured(id, updateFn)}
												sendScoreChange={(upvote, id, updateScore) => sendScoreChange(upvote, id, updateScore)}
											// updatePost={(id, isScore, update) => updatePost(id, isScore, update)}
											/>
										</Col>
									)) :
									<Col className="text-center"><h5>No Feedbak yet!</h5></Col>
							}

						</Row>
					</Col>
					<Col xs={{order: 1}} md={{span: 3, order: 2}} className="businessRightCol">
						<Row className="businessRightRow">
							<Button className="purple-button" onClick={() => handleNewFeedbakButton()}> New Feedbak </Button>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>{businessData.name}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">{`partner since ${partnerSinceDate}`}</Card.Subtitle>
											<Card.Text>
												{businessData.about}
											</Card.Text>
											<Card.Link href={businessData.website} target="_blank" className="business-website"><i className="fa-solid fa-globe"></i>&nbsp;website</Card.Link>
										</Card.Body>
									</Card>
								</div>

							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>Map</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">Find a location</Card.Subtitle>
											<Card.Text>
												This can have a map of nearby locations. Not too hard but will require addresses for all existing and future businesses.
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>Featured Feedbak</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">See previous features</Card.Subtitle>
											<Card.Text>
												Will fill this in with some previously featured Feedbaks for this business.
											</Card.Text>
										</Card.Body>
									</Card>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>

			</Container>
			<WriteReviewModal
				show={showReviewModal}
				onHide={() => setShowReviewModal(false)}
				id={id}
			/>
		</div>
	)
}

export default Business;
