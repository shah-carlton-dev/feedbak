import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Card, ToggleButton } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'
import UserContext from "../utils/UserContext.js";
import { compileString } from 'sass';

const Business = () => {
	const { userData, setUserData } = useContext(UserContext);

	const [posts, setPosts] = useState([]);
	const [businessData, setBusinessData] = useState([]);
	const [showReviewModal, setShowReviewModal] = useState(false)
	const [filter, setFilter] = useState('newest')

	const partnerSinceDate = new Date(businessData.dateJoined).toLocaleDateString('en-us', { year: "numeric", month: "long" })
	const { id } = useParams();
	const buttons = [
		{
			title: 'hot 🔥',
			key: 'hot',
			onClick: () => setFilter('hot')
		}, {
			title: 'oldest 📉',
			key: 'oldest',
			onClick: () => setFilter('oldest')
		}, {
			title: "newest 📈",
			key: 'newest',
			onClick: () => setFilter('newest')
		}
	];

	useEffect(() => {
		getPostsData();
		getBusinessData();
	}, []);

	const getPostsData = async () => {
		const url = API_URL + '/posts/all/' + id;
		try {
			await Axios.get(url).then(res => setPosts(res.data));
		} catch (err) {
			console.log("error retrieving posts list");
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

	const sortPosts = (postsList) => {
		let temp = [...postsList]
		let sorted;
		if (filter === 'hot') {
			sorted = temp.sort(function (a, b) {
				return b.score - a.score;
			})
		} else if (filter === 'oldest') {
			sorted = temp.sort(function (a, b) {
				return Date.parse(a.date) - Date.parse(b.date)
			})
		} else if (filter === 'newest') {
			sorted = temp.sort(function (a, b) {
				return Date.parse(b.date) - Date.parse(a.date)
			})
		}
		console.log(sorted)
		return (sorted)
	}

	const handleMakeFeatured = async (id) => {
		const postInfo = getPostById(id)
		const url = `${API_URL}/posts/updateFeatured/${id}`
		const info = { busi: postInfo.business }
		const originalStatus = postInfo.featured
		try {
			await Axios.put(url, info)
				.then((res) => {
					// update featured 
				});
		} catch (err) {
			console.log("Error while attempting featured change");
		} finally {
			updatePost(id, false, !originalStatus)
		}
	}

	const sendAdminScoreChange = async (upvote, id) => {
		const postInfo = getPostById(id)
		const url = `${API_URL}/posts/updateScore/admin/${id}`
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
			updatePost(id, true, newScore)
		}
	}

	const sendScoreChange = async (upvote, id) => {
		if (admin) {
			sendAdminScoreChange(upvote);
			return;
		}
		const url = `${API_URL}/posts/updateScore/${id}`
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
			updatePost(id, true, newScore)
		}
	}

	const updatePost = (id, isScore, update) => {
		let temp = [...posts]
		let post = posts.find(e => {
			// console.log(e)
			// console.log(id)
			e._id == id
		})
		console.log(post)
		isScore ? (post.score = update) : (post.featured = update)
		let newPostsList = temp.filter(e => e._id !== id)
		newPostsList.push(post)
		newPostsList = sortPosts(newPostsList)
		setPosts(newPostsList)
	}

	const handleFilterChange = async (key, onClick) => {
		onClick();
		// await getPostsData().then(
		// 	data => {
		// 		console.log(data)
		// 		sortPosts(data)
		// 	}
		// );
	}

	const getPostById = (id) => {
		return posts.filter(e => e._id === id);
	}

	return (
		<div className="">
			<Container className="">
				<Row className="bizHeader">
					<h1 className="text-center">{businessData.name}</h1>

				</Row>

				<Row>
					<Col md={9} id="scroll-meeee" className="businessLeftCol">
						<Row>
							<Col className="py-3-custom px-5">
								{buttons.map((button, idx) => (
									<ToggleButton
										className="mx-2"
										key={idx}
										type="radio"
										variant="secondary"
										name="radio"
										value={button.key}
										checked={button.key == filter}
										onClick={(e) => handleFilterChange(button.key, () => button.onClick())}
									>
										{button.title}
									</ToggleButton>
								))}
							</Col>
						</Row>
						<Row>
							{posts.map((info, idx) => (
								<Col xl="8" key={idx} className="py-3-custom px-5">
									<Post
										key={idx}
										postInfo={info}
										admin={userData.user.admin}
										handleMakeFeatured={(id) => handleMakeFeatured(id)}
										sendScoreChange={(upvote, id) => sendScoreChange(upvote, id)}
									/>
								</Col>
							))}
						</Row>
					</Col>
					<Col md={3} className="businessRightCol">
						<Row className="businessRightRow">
							<Button className="purple-button" onClick={() => setShowReviewModal(!showReviewModal)}> New Feedbak </Button>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>{businessData.name}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">{`partner since ${partnerSinceDate}`}</Card.Subtitle>
											<Card.Text>
												{businessData.about}
											</Card.Text>
											<Card.Link href={businessData.website} target="_blank">website</Card.Link>
										</Card.Body>
									</Card>
								</div>

							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>Map</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
											<Card.Text>
												Some quick example text to build on the card title and make up the bulk of
												the card's content.
											</Card.Text>
											<Card.Link href="#">Card Link</Card.Link>
											<Card.Link href="#">Another Link</Card.Link>
										</Card.Body>
									</Card>
								</div>
							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<Card>
										<Card.Body>
											<Card.Title>Feedback</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
											<Card.Text>
												Some quick example text to build on the card title and make up the bulk of
												the card's content.
											</Card.Text>
											<Card.Link href="#">Card Link</Card.Link>
											<Card.Link href="#">Another Link</Card.Link>
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
