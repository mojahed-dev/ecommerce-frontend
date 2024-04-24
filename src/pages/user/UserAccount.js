import { Nav, Tab, Row, Col } from 'react-bootstrap';

import MyAccount from "../../components/user/MyAccount";
import MyOrders from "../../components/user/MyOrders";
import MyReviews from "../../components/user/MyReviews";
import MyWishList from "../../components/user/MyWishList";
import ChangePassword from '../../components/user/ChangePassword';

function UserAccount() {
    return (
        <>
            <div className="container">
            <Tab.Container id="account-tabs" defaultActiveKey="profile" className=" my-5">
                <Row  className="my-5">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">My Account</Nav.Link>
                            </Nav.Item>
                           
                            <Nav.Item>
                                <Nav.Link eventKey="orders">My Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="account-security">Account Security</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="wishList">My Wish List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews">My Reviews</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <MyAccount />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <MyOrders />
                            </Tab.Pane>
                            <Tab.Pane eventKey="account-security">
                                <ChangePassword />
                            </Tab.Pane>
                            <Tab.Pane eventKey="wishList">
                                <MyWishList />
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                                <MyReviews />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </div>
        </>
    )
}

export default UserAccount