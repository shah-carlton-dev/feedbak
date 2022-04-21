import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Card} from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'
import UserContext from "../utils/UserContext.js";

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
		  await Axios.get(url).then(res => {setBusinessData(res.data); console.log(businessData);});
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
			<Container fluid className="">
				<Row>
					<h1 className="text-center">{businessData.name}</h1>
					<Button onClick={() => setShowReviewModal(!showReviewModal)}> New Feedbak </Button>
				</Row>

				<Row>
					<Col md={9} className="businessLeftCol">
						<Row>
							{posts.map((info, idx) => (
							<Col key={idx} className="py-3-custom px-5">
								<Post key={idx} postInfo={info} admin={userData.user.admin}/>
							</Col>
							))}
						</Row>
					</Col>
					<Col md={3} className="businessRightCol">
						<Row className="businessRightRow">
							<Col xl={12}>
								<div className="businessSide">
									<h3>About</h3>
								</div>
								
							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<h3>Map</h3>
								</div>
							</Col>
							<Col xl={12}>
								<div className="businessSide">
									<h3>Top Feedbaks</h3>
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
