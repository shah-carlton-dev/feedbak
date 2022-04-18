import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import "../css/NavbarContainer.scss"
import WriteReviewModal from './WriteReviewModal'

const Business = (props) => {
	const [posts, setPosts] = useState([]);
	const [showReviewModal, setShowReviewModal] = useState(false)

	const { id } = useParams();

	const getPostsData = async () => {
		const url = API_URL + '/posts/all/' + id;
		try {
			await Axios.get(url).then(res => setPosts(res.data));
		} catch (err) {
			console.log("error retrieving posts list");
		}
	}

	useEffect(() => {
		getPostsData();
	}, []);

	return (
		<div className="">
			<Container className="">
				<h1 className="text-center">Business!</h1>
				<Button onClick={() => setShowReviewModal(!showReviewModal)}> New Feedbak </Button>
				<Row xs={1} md={2} className="">
					{posts.map((info, idx) => (
						<Col key={idx} className="py-3 px-5">
							<Post key={idx} postInfo={info} />
						</Col>
					))}
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
