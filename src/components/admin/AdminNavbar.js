import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import UserContext from '../../UserContext';

export default function AdminNavbar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <div className="container-fluid">
                <Navbar.Brand href="#">Brio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/dashboard" disabled>Admin Dashboard</Nav.Link>
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/orders/all">Orders</Nav.Link>
                            <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                            <Nav.Link as={NavLink} to="#" disabled>My Account</Nav.Link>
                            <Nav.Link as={NavLink} to="#" disabled>Reviews</Nav.Link>
                            <Nav.Link as={NavLink} to="#" disabled>Sales</Nav.Link>
                            
                            {(user.id !== null && user.isAdmin) ?
                             <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                             :
                             <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            }
                        
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
