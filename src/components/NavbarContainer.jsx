import React, { useState } from 'react';

import { Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import Home from './Home';
import Login from './Login';
import Business from './Business';
import Searchbar from './SearchBar';
import '../css/NavbarContainer.scss';
import logo from '../images/logo.png';
const NavbarContainer = () => {

    const [toggled, setToggled] = useState(false);
    const handleTogglePress = (e) => {
        setToggled(!toggled);
        toggled ? $('#registerbtn').css("display", "inline-block") : $('#registerbtn').css("display", "none");
    }

    return (
        <>
            <Navbar className="dark" expand="md" collapseOnSelect={true}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Nav.Link className="text-light" eventKey={2} as={Link} to="/">Feedbak</Nav.Link>
                    </Navbar.Brand>
                    <Navbar className="justify-content-center">
                        <Searchbar />
                    </Navbar>
                    <Navbar className="justify-content-end">
                        <Nav.Link className="text-light" eventKey={4} as={Link} to="/login">Login</Nav.Link>
                    </Navbar>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/business/:id" element={<Business />} />
            </Routes>
        </>
    )
}
export default NavbarContainer;

{/* <Nav.Link className="text-light" eventKey={2} as={Link} to="/">Home</Nav.Link>
<Nav.Link className="text-light" eventKey={4} as={Link} to="/login">Login</Nav.Link> */}