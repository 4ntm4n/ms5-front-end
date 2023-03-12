import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    
    // navigation links shown if loggedIn
    const authNav = (
        <>
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/groups">Groups</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#setThisAction!">Logout</Nav.Link>
        </>
    )

    // navigation links shown if !loggedIn
    const unAuthNav = (
        <>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
        </>
    )


    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">GroupTask</Navbar.Brand>
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