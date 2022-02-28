import React,{useState} from 'react';

import { Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import About from './About';
import Home from './Home';
import Login from './Login';

import '../css/NavbarContainer.scss';

const NavbarContainer = () => {
    
    const [toggled, setToggled] = useState(false);
    const handleTogglePress = (e) => {
        setToggled(!toggled);
        toggled ? $('#registerbtn').css("display", "inline-block") : $('#registerbtn').css("display", "none");
    }

    return (
        <>
            <Navbar className="dark" expand="md" collapseOnSelect={true}>
                <Navbar.Toggle className="ml-auto mr-0" onClick={e => handleTogglePress(e)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className="text-light" eventKey={2} as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className="text-light" eventKey={3} as={Link} to="/about">About</Nav.Link>
                        <Nav.Link className="text-light" eventKey={4} as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </>
    )
}
export default NavbarContainer;
