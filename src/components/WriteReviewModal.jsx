import React, { useState, useContext } from "react"
import Axios from "axios";

import { Modal, Button, Form, } from "react-bootstrap";

import { API_URL } from "../utils/constants";
import UserContext from "../utils/UserContext.js";

function WriteReviewModal(props) {
	const { userData, setUserData } = useContext(UserContext);

	let title, post = "";
	const authorId = userData.user._id;
	const businessId = props.id;

	async function sendNewReviewReq(e) {
		e.preventDefault()

		const url = API_URL + "/posts/new";
		const info = { title, post, authorId, businessId }

		try {
			await Axios.post(url, info).then((res) => {
				console.log('Successfully posted new feedbak')
				console.log(res)
				props.onHide();
			});
		} catch (err) {
			console.log("Error while posting new feedbak");
			console.log(err)
		}
	};

	return (
		<Modal {...props} size="md" aria-labelledby="login-signup-modal" centered >
			<Modal.Header>
				<h4>Write New Feedbak</h4>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={e => sendNewReviewReq(e)}>
					<Form.Group className="mb-3" controlId="titleField">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" placeholder="Give your feedbak a short and sweet title"
							onChange={(e) => title = (e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="bodyField">
						<Form.Label>Feedbak Body</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Now add some substance" 
							onChange={(e) => post = (e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => props.onHide()}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WriteReviewModal;