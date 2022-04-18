import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import UserContext from "../utils/UserContext.js";

import "../css/NavbarContainer.scss"

const Business = (props) => {
	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);

	const [reviews, setReviews] = useState([])

	// const getPostsData = async () => {
	// 	userData.user.reviews.forEach(async id => {
	// 		const url = API_URL + '/posts/' + id;
	// 		try {
	// 			await Axios.get(url).then(res => {
	// 				setReviews([...reviews, res])
	// 				console.log(res)
	// 			});
	// 		} catch (err) {
	// 			console.log("error retrieving user's posts");
	// 		}
	// 	})
	// }

	// useEffect(() => {
	// 	getPostsData()
	// }, []);

	return (
		<div className="">
			<Container className="">
				<h1 className="text-center">User!</h1>
				<Row xs={1} md={2} className="">
					{reviews.map((info, idx) => (
						<Col key={idx} className="py-3 px-5">
							<Post key={idx} postInfo={info} />
						</Col>
					))}
				</Row>
				{`username: ${userData.user.username}`}
				<br />
				{`email: ${userData.user.email}`}
				<br />
				{`reviews: ${userData.user.reviews}`}
			</Container>

		</div>
	)
}

export default Business;
