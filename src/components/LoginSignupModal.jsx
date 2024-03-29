import React, { useState, useContext } from "react"
import Axios from "axios";

import { Modal, Button, ToggleButton, ToggleButtonGroup, Form, } from "react-bootstrap";

import { API_URL } from "../utils/constants";
import UserContext from "../utils/UserContext.js";

function LoginForm({ hide }) {
	const { userData, setUserData } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [errMessage, setErrMessage] = useState("")

	async function handleLoginSubmit(e) {
		e.preventDefault();
		sendLoginReq({ username, password })
	};

	async function sendLoginReq(info) {
		const url = API_URL + "/users/login";
		try {
			await Axios.post(url, info).then((res) => {
				console.log('Successfully logged in')
				setUserData(res.data)
				localStorage.setItem("auth-token", res.data.token);
				hide();
			});
		} catch (err) {
			console.log("Error while attempting login");
			setErrMessage(err.response.data.message)
		}
	};

	return (
		<Modal.Body>
			<h4>Sign in</h4>
			<Form onSubmit={e => handleLoginSubmit(e)}>
				<Form.Group className="mb-3" controlId="usernameField">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Enter username" autoComplete="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="passwordField">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				<Form.Text className="text-muted">
					<br />{`${errMessage}`}
				</Form.Text>
			</Form>
		</Modal.Body>
	)
}

function SignupForm({ hide }) {
	const { userData, setUserData } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSignupSubmit(e) {
		e.preventDefault();
		sendSignupReq({ username, email, password })
	};

	async function sendSignupReq(info) {
		const url = API_URL + "/users/new";
		try {
			await Axios.post(url, info).then((res) => {
				console.log('Successfully created user')
				setUserData(res.data)
				hide(true);
			});
		} catch (err) {
			console.log("Error while attempting signup");
			console.log(err.message)
		}
	};
	return (
		<Modal.Body>
			<h4>Join</h4>
			<p>Creating an account allows you to vote on existing Feedbak and create your own Feedbak</p>
			<Form onSubmit={e => handleSignupSubmit(e)}>
				<Form.Group className="mb-3" controlId="usernameField">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Enter username" autoComplete="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="emailField">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Email" autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="passwordField">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" autoComplete="current-password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Modal.Body>
	)
}

function LoginSignupModal(props) {
	const [open, setOpen] = useState(props.open);

	return (
		<Modal {...props} size="md" aria-labelledby="login-signup-modal"  >
			<ToggleButtonGroup type="radio" name="options" defaultValue={props.open}>
				<ToggleButton id="loginsignup-radio-signup" className={open === 2 ? `` : `not-selected`} value={2} checked={open === 2} onClick={() => setOpen(2)}>
					Join
				</ToggleButton>
				<ToggleButton id="loginsignup-radio-login" className={open === 1 ? `` : `not-selected`} value={1} checked={open === 1} onClick={() => setOpen(1)}>
					Sign in
				</ToggleButton>

			</ToggleButtonGroup>
			{
				(open || login) === 1
					? <LoginForm hide={(x) => props.onHide(x)} />
					: <SignupForm hide={(x) => props.onHide(x)} />
			}
			<Modal.Footer>
				<Button onClick={() => props.onHide()}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LoginSignupModal;