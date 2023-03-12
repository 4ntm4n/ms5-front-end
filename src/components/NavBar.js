import React, { useState } from 'react'

import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(true);


    // navigation links shown if loggedIn
    const authNav = (
        <>
            <NavLink className="nav-link" to="/feed">Feed</NavLink>
            <NavLink className="nav-link" to="/groups">Groups</NavLink>
            <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
            <NavLink className="nav-link" to="#setThisAction!">Logout</NavLink>
        </>
    )

    // navigation links shown if !loggedIn
    const unAuthNav = (
        <>
            <NavLink className="nav-link" to="/login">Log in</NavLink>
            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </>
    )


    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">GroupTask</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar`}
                        aria-labelledby={`offcanvasNavbarLabel`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                                GroupTask
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">

                                {loggedIn ? authNav : unAuthNav}

                                {/* <NavDropdown
                                    title="Dropdown"
                                    id={`offcanvasNavbarDropdown`}
                                >
                                </NavDropdown> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar