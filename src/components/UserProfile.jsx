import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AdminSection from './AdminSection'
import { Row, Col, Container, Button, Modal, Form, Card } from 'react-bootstrap';
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
				<Button onClick={() => props.onHide()}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	)
}



const UserProfile = (props) => {
	const { id } = useParams();
	const { userData, setUserData } = useContext(UserContext);
	const admin = userData.user.admin

	const [reviews, setReviews] = useState([])
	const [showChangePassword, setShowChangePassword] = useState(false)
	const [partners, setPartners] = useState([])

	const getPartnersData = async () => {
		const url = API_URL + '/businesses/search';
		try {
			await Axios.get(url).then(res => { setPartners(res.data); console.log(res.data) });
		} catch (err) {
			console.log("Error retrieving business list")
		}
	}

	useEffect(() => {
		getPartnersData();
	}, []);

	const getPostsData = async () => {
		try {
			const url = API_URL + '/posts/user/' + id;
			try {
				await Axios.get(url).then(res => {
					setReviews(res.data)
				});
			} catch (err) {
				console.log("error retrieving user's posts");
				console.log(err);
			}
		}
		catch (err) {
			// error is before userData populates
			console.log(err)
		}

	}

	useEffect(() => {
		getPostsData()
	}, [userData]);

	return (
		<div className="">
			<Container className="">
				<h1 className="text-center">Your Profile</h1>
				<h3>Your Info</h3>
				<p>
					{`username: ${userData.user.username}`}
					<br />
					{`email: ${userData.user.email}`}
					<br />
					<Button className="change-pass-btn" variant='link' onClick={() => setShowChangePassword(true)}>Change Password</Button>
					<br />
				</p>
				<h3>Your Feedbak</h3>
				<Row xs={1} md={2} className="px-auto">
					{reviews.map((info, idx) => (
						<Col xl={12} key={idx} className="py-3 px-5">
							<Post key={idx} postInfo={info} inProfile={true} />
						</Col>
					))}
				</Row>
				{
					admin && <h3>Admin Features</h3>
				}
				{
					admin && <div className="p-3"><AdminSection partnerList={partners} /></div>
				}
			</Container>

			<ChangePasswordModal show={showChangePassword} onHide={() => setShowChangePassword(false)} userid={userData.user._id} />

		</div>
	)
}

export default UserProfile;
