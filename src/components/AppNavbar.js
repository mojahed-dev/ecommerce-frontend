import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import CartIcon from './CartIcon';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
                <Navbar.Brand>
                    <Link to="/" className="navbar-brand">Brio</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <>
                            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            
                            {(user.id !== null) ?
                                <>
                                    <Nav.Link as={NavLink} to="/users/details">Account</Nav.Link>
                                    <Nav.Link as={NavLink} to="/carts/my-cart">
                                        <CartIcon />
                                    </Nav.Link>

                                    <Nav.Link as={NavLink} to="/wish-lists">
                                        <div className="position-relative">
                                            <FontAwesomeIcon icon={faHeart} size="lg" />
                                            <span className="position-absolute top-0 start-100 translate-middle p-0 bg-warning border border-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: "1.2rem", height: "1.2rem" }}>
                                                <span className="visually-hidden">New alerts</span>
                                                <span className="text-sm" style={{ fontSize: "12px" }}>0</span>
                                            </span>
                                        </div>
                                    </Nav.Link >

                                    <Nav.Link as={NavLink} to="/logout" className='float-end'>Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                </>
                            }
                        </>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
