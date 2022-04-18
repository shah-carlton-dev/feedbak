import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import Post from './Post';
import Axios from 'axios';
import { API_URL } from '../utils/constants';
import UserContext from "../utils/UserContext.js";

import "../css/NavbarContainer.scss"

function ChangePasswordModal(props) {
	const [errMessage, setErrMessage] = useState("")
	let current, newpass, newconf = "";
	const userid = props.userid

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		if (!(newpass === newconf)) {
			setErrMessage('Passwords must match')
			return;
		};
		const url = `${API_URL}/users/changePassword`
		const info = { userId: userid, current, newpass }
		try {

			await Axios.post(url, info)
				.then((res) => {
					console.log('Successfully changed password')
					props.onHide();
				});
		} catch (err) {
			console.log("Error while attempting password change");
			setErrMessage(err.response.data.message)
		}
	}

	return (
		<Modal {...props}>
			<Modal.Header>
				<h4>
					Change Your Password
				</h4>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={e => handlePasswordChange(e)}>
					<Form.Group className="mb-3" controlId="currentPasswordField">
						<Form.Label>Old Password</Form.Label>
						<Form.Control type="password" placeholder="" autoComplete="current-password"
							onChange={(e) => current = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="newPasswordField">
						<Form.Label>New Password</Form.Label>
						<Form.Control type="password" placeholder="" autoComplete=""
							onChange={(e) => newpass = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="confirmNewPasswordField">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control type="password" placeholder="" autoComplete=""
							onChange={(e) => newconf = (e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
					<Form.Text className="text-muted">
						{`${errMessage}`}
					</Form.Text>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => props.onHide()}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

const Business = (props) => {
	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);

	const [reviews, setReviews] = useState([])
	const [showChangePassword, setShowChangePassword] = useState(false)

	const getPostsData = async () => {
		try {
			userData.user.reviews.forEach(async id => {
				const url = API_URL + '/posts/one/' + id;
				try {
					await Axios.get(url).then(res => {
						setReviews([...reviews, res.data])
					});
				} catch (err) {
					console.log("error retrieving user's posts");
				}
			})
		} catch (err) {
			// error is before userData populates
		}
		
	}

	useEffect(() => {
		getPostsData()
	}, [userData]);

	return (
		<div className="">
			<Container className="">
				<h1 className="text-center">User!</h1>
				<p>
					{`username: ${userData.user.username}`}
					<br />
					{`email: ${userData.user.email}`}
					<br />
					<Button onClick={() => setShowChangePassword(true)}>Change Password</Button>
					<br />
				</p>
				<h3>Your Feedbak</h3>
				<Row xs={1} md={2} className="">
					{reviews.map((info, idx) => (
						<Col key={idx} className="py-3 px-5">
							<Post key={idx} postInfo={info} />
						</Col>
					))}
				</Row>
			</Container>

			<ChangePasswordModal show={showChangePassword} onHide={() => setShowChangePassword(false)} userid={userData.user._id} />

		</div>
	)
}

export default Business;
