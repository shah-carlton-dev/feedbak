import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Home from "./Home";
import Business from "./Business";
import Searchbar from "./SearchBar";
import LoginSignupModal from "./LoginSignupModal";
import "../css/NavbarContainer.scss";

const NavbarContainer = () => {
	//   const [toggled, setToggled] = useState(false);
	//   const handleTogglePress = (e) => {
	//     setToggled(!toggled);
	//     toggled
	//       ? $("#registerbtn").css("display", "inline-block")
	//       : $("#registerbtn").css("display", "none");
	//   };

	const [showLogin, setShowLogin] = useState(0);

	return (
		<div>
			<Navbar className="dark navbar-height" expand="md" collapseOnSelect={true} >
				<Container>
					<Navbar.Brand className="text-grey" as={Link} to="/" href="#home">
						Feedbak
					</Navbar.Brand>
					<Navbar className="justify-content-center">
						<Searchbar />
					</Navbar>
					<Navbar className="justify-content-end">
						<Nav.Link className="text-grey" eventKey={4} as={Link} to="#" onClick={() => setShowLogin(1)} >
							Login
						</Nav.Link>
						<Nav.Link className="text-grey" eventKey={5} as={Link} to="#" onClick={() => setShowLogin(2)} >
							Signup
						</Nav.Link>
					</Navbar>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/business/:id" element={<Business />} />
			</Routes>

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
