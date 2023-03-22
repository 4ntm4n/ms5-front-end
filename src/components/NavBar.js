import React, { useEffect } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useCurrentUser  } from '../contexts/currentUserContext';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
   const currentUser = useCurrentUser();
   const navigate = useNavigate();
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

    useEffect(() => {
        //console.log('currentUser changed!', currentUser)
    }, [currentUser]);

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

                                {currentUser? authNav : unAuthNav}

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