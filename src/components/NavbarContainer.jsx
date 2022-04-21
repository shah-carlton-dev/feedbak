import React, { useState, useContext } from "react";
import { Route, Router, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import Home from "./Home";
import Business from "./Business";
import Searchbar from "./SearchBar";
import LoginSignupModal from "./LoginSignupModal";
import UserProfile from './UserProfile.jsx'

import "../css/NavbarContainer.scss";

import UserContext from "../utils/UserContext.js";
import { createPortal } from "react-dom/cjs/react-dom.development";

const NavbarContainer = () => {
	//   const [toggled, setToggled] = useState(false);
	//   const handleTogglePress = (e) => {
	//     setToggled(!toggled);
	//     toggled
	//       ? $("#registerbtn").css("display", "inline-block")
	//       : $("#registerbtn").css("display", "none");
	//   };
	const { userData, setUserData } = useContext(UserContext);

	const [showLogin, setShowLogin] = useState(0);

	const doLogout = () => {
		localStorage.removeItem('auth-token');
		setUserData({ token: 0, user: {} });
	}

	return (
		<div className="background-color">
			<Navbar className="dark navbar-height" expand="md" collapseOnSelect={true} >
				<Container>
					<Navbar.Brand className="white-text" as={Link} to="/" href="#home">
						Feedbak
					</Navbar.Brand>
					<Navbar className="justify-content-end">
						{
							userData.user.username ?
								<NavDropdown title={userData.user.username} id="username-nav-dropdown" className="white-text">
									<NavDropdown.Item href={`#/user/${userData.user._id}`} className="white-text">Profile</NavDropdown.Item>
									{/* <NavDropdown.Item href={"#"}>Feedbaks</NavDropdown.Item> */}
									<NavDropdown.Divider />
									<NavDropdown.Item href="#/" onClick={() => doLogout()} className="white-text">Logout</NavDropdown.Item>
								</NavDropdown> :
								<>
									<Nav.Link className="white-text" eventKey={4} as={Link} to="#" onClick={() => setShowLogin(1)} >
										Login
									</Nav.Link>
									<Nav.Link className="white-text" eventKey={5} as={Link} to="#" onClick={() => setShowLogin(2)} >
										Signup
									</Nav.Link>
								</>
						}
					</Navbar>
				</Container>
			</Navbar>
			{/* <Router> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/business/:id" element={<Business />} />
					<Route path="/user/:id" element={<UserProfile user={userData.user} />} />
				</Routes>
			{/* </Router> */}
			{
				showLogin !== 0 ? (
					showLogin === 1 ?
						<LoginSignupModal
							show={true}
							open={1}
							onHide={() => setShowLogin(0)}
						/> :
						<LoginSignupModal
							show={true}
							open={2}
							onHide={() => setShowLogin(0)}
						/>
				) : null
			}

		</div>
	);
};
export default NavbarContainer;
