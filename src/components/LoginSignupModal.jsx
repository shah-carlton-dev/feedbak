import React, { useState, useContext } from "react"
import Axios from "axios";

import { Modal, Button, ToggleButton, ToggleButtonGroup, Form, } from "react-bootstrap";

import { API_URL } from "../utils/constants";
import UserContext from "../utils/UserContext.js";

function LoginForm({ hide }) {
	const { userData, setUserData } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
		}
	};

	return (
		<Modal.Body>
			<h4>Login</h4>
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
				hide();
			});
		} catch (err) {
			console.log("Error while attempting signup");
			console.log(err.message)
		}
	};
	return (
		<Modal.Body>
			<h4>Signup</h4>
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
	const login = props.open
	const [open, setOpen] = useState(0);

	return (
		<Modal {...props} size="md" aria-labelledby="login-signup-modal"  >
			<ToggleButtonGroup type="radio" name="options" defaultValue={props.open}>
				<ToggleButton id="loginsignup-radio-login" value={1} onClick={() => setOpen(1)}>
					Login
				</ToggleButton>
				<ToggleButton id="loginsignup-radio-signup" value={2} onClick={() => setOpen(2)}>
					Signup
				</ToggleButton>
			</ToggleButtonGroup>
			{
				(open || login) === 1
					? <LoginForm hide={() => props.onHide()} />
					: <SignupForm hide={() => props.onHide()} />
			}
			<Modal.Footer>
				<Button onClick={() => props.onHide()}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LoginSignupModal;