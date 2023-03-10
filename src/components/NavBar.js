import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {
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
                                <Nav.Link href="#action1">Log in</Nav.Link>
                                <Nav.Link href="#action2">Sign up</Nav.Link>
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