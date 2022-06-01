import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Card, ToggleButton, Modal } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'
import UserContext from "../utils/UserContext.js";
import SuggestLoginModal from './SuggestLoginModal';

const Business = (props) => {

	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);

	// variables to be used throughout component
	const [posts, setPosts] = useState([]);
	const [featuredPosts, setFeaturedPosts] = useState([]);
	const [businessData, setBusinessData] = useState([]);
	const [showReviewModal, setShowReviewModal] = useState(false)
	const [showFeaturedModal, setShowFeaturedModal] = useState(false)
	const [featuredPostDisplay, setFeaturedPostDisplay] = useState({})
	const [filter, setFilter] = useState('newest')
	const [suggestLogin, setSuggestLogin] = useState(false)

	const partnerSinceDate = new Date(businessData.dateJoined).toLocaleDateString('en-us', { year: "numeric", month: "long" })

	// effects on page load 
	useEffect(() => {
		getPostsData();
		getBusinessData();
		getFeaturedData();
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
	const getFeaturedData = async () => {
		const url = API_URL + '/posts/featured/' + id;
		try {
			await Axios.get(url).then(res => setFeaturedPosts(res.data));
		} catch (err) {
			console.log("error retrieving featured posts list");
			console.log(err)
		}
	}

	console.log(featuredPosts)

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
		}
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
		return sorted
	}

	const handleNewFeedbakButton = () => {
		if (!userData?.user?._id) {
			setSuggestLogin(true);
			return;
		}
		setShowReviewModal(true)
	}

	// on filter change
	const handleFilterChange = async (key) => {
		setFilter(key);
		let new_data = await posts;
		const sortedPosts = sortPosts(key, new_data)
		setPosts([])
		setPosts(sortedPosts)
	}

	const handleFeaturedPostClick = (post) => {
		setFeaturedPostDisplay(post)
		setShowFeaturedModal(true)
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
			title: 'old',
			emoji: <i className="fa-solid fa-arrow-trend-down"></i>,
		}, {
			title: 'new',
			emoji: <i className="fa-solid fa-arrow-trend-up"></i>,
		}
	];

	function TruncatedLine({ text }) {
		return (
			<span style={{ position: "relative", display: "block" }}>
				<span style={{ color: "transparent" }}>X</span>
				<span
					style={{
						display: "block",
						position: "absolute",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						width: "100%",
						top: 0,
					}}
				>
					{text}
				</span>
			</span>
		);
	}

	function ViewFeaturedModal(props) {
		const data = props.data
		return (
			<Modal {...props} size="lg" aria-labelledby="view-featured-post-modal"  >
				<Modal.Body>
					<p className="text-muted">Viewing a featured Feedbak:</p>
					<Post key={data._id} postInfo={data} inProfile={true} />

				</Modal.Body>
				<Modal.Footer xs={12}>
					<Button onClick={() => props.onHide()}>Close</Button>
				</Modal.Footer>
			</Modal>
		)

	}

	return (
		<div className="">
			<Container className="">
				<Row className="bizHeader">
					<h1 className="text-center">{businessData.name}</h1>
				</Row>

				<Row>
					<Col xs={{ order: 2 }} md={{ span: 9, order: 1 }} id="scroll-meeee" className="businessLeftCol">
						<Row>
							<Col className="py-3-custom px-5">
								<div className="filter-buttons-container">
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
											{button.title} &#8198; {button.emoji}
										</ToggleButton>
									))}
								</div>
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
											/>
										</Col>
									)) :
									<Col className="text-center"><h5>No Feedbak yet!</h5></Col>
							}

						</Row>
					</Col>
					<Col xs={{ order: 1 }} md={{ span: 3, order: 2 }} className="businessRightCol">
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
											<Card.Title>Featured Feedbak</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">See previous features</Card.Subtitle>
											<Row xs={1} className="g-4">
												{featuredPosts.length > 0 ?
												featuredPosts.map((post, idx) =>
													<Col xs={12} key={`${post._id}_${idx}`}>
														<Card className="clickable-card" onClick={() => handleFeaturedPostClick(post)}>
															<Card.Body>
																<Card.Text>
																	<TruncatedLine text={post.title} />
																</Card.Text>
															</Card.Body>
														</Card>
													</Col>
												) :
												<p>No featured posts for this business yet!</p>
												}
											</Row>
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
			<SuggestLoginModal
				show={suggestLogin}
				onHide={() => setSuggestLogin(false)}
				message={"Join or sign in to write new Feedbak!"}
			/>
			<ViewFeaturedModal
				show={showFeaturedModal}
				data={featuredPostDisplay}
				onHide={() => setShowFeaturedModal(false)}
			/>

		</div>
	)
}

export default Business;
