import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Card} from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'
import UserContext from "../utils/UserContext.js";
import {Link} from 'react-router-hash-link';
const Business = (props) => {
	const [posts, setPosts] = useState([]);
	const [businessData, setBusinessData] = useState([]);
	const [showReviewModal, setShowReviewModal] = useState(false)

	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);
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
		  await Axios.get(url).then(res => {setBusinessData(res.data);});
		} catch (err) {
		  console.log("Error retrieving business list")
		}
	  }

	useEffect(() => {
		getPostsData();
		getBusinessData();
		console.log(businessData);
	}, []);

	return (
		<div className="">
			<Container  className="">
				<Row className="bizHeader">
					<h1 className="text-center">{businessData.name}</h1>
					
				</Row>

				<Row>
					<Col md={9} id="scroll-meeee" className="businessLeftCol">
						<Row>
							{posts.map((info, idx) => (
							<Col key={idx} className="py-3-custom px-5-custom">
								<Post key={idx} postInfo={info} admin={userData.user.admin} user={userData.user._id} />
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
										<Card.Subtitle className="mb-2 text-muted">{businessData.dateJoined}</Card.Subtitle>
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
				onHide={()=>setShowReviewModal(false)}
				id={id}
			/>
		</div>
	)
}

export default Business;
