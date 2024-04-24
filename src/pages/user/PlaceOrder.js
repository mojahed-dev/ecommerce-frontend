import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import UserContext from '../../UserContext';
import { Tabs, Tab, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart, resetCart } from '../../CartContext';

import MyAccount from '../../components/user/MyAccount';

function PlaceOrder() {
    const navigate = useNavigate();

    const { cartDispatch } = useCart();

    const [activeTab, setActiveTab] = useState('shipping');

    // const { user } = useContext(UserContext);
    // console.log("user from placeOrder akie:", user)

    // const [shippingInfo, setShippingInfo] = useState({
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     mobileNo: user.mobileNo,
    //     street: user.street,
    //     country: user.country,
    //     province: user.province,
    //     city: user.city,
    //     postalcode: user.postalcode

    // });


    const [selectedShippingMethod, setSelectedShippingMethod] = useState('ninjaVan')
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('cashOnDelivery');
    // const [isShippingInfoValid, setIsShippingInfoValid] = useState(false);

    console.log("shipping method:", selectedShippingMethod);
    console.log("payment method:", selectedPaymentOption);


    function addOrder() {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        // Define the order data (paymentMethod and shippingMethod variables)
        const paymentMethod = selectedPaymentOption;
        const shippingMethod = selectedShippingMethod;

        // Make the HTTP request to the backend
        fetch(`${process.env.REACT_APP_API_URL}/orders/place-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentMethod,
                shippingMethod,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Failed to place the order: ${response.status} - ${response.statusText}`);
                }
            })
            .then((data) => {
                console.log('Order placed successfully:', data);
                if (data) {
                    Swal.fire({
                        icon: "success",
                        title: "Successful Order",
                    });
                    resetCart(cartDispatch);
                    navigate("/products");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Unsuccessful Order",
                    });
                }
            })
            .catch((error) => {
                console.error('Error placing the order:', error);
                Swal.fire({
                    icon: "error",
                    title: "Something wrong!",
                });
            });
    }


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    // const handleNextClick = () => {
    //     if (activeTab === 'shipping') {
    //         // Validate shipping info fields here
    //         if (shippingInfo.firstName &&
    //             shippingInfo.lastName &&
    //             shippingInfo.email &&
    //             shippingInfo.mobileNo &&
    //             shippingInfo.street &&
    //             shippingInfo.country &&
    //             shippingInfo.province &&
    //             shippingInfo.city &&
    //             shippingInfo.postalcode &&
    //             selectedShippingMethod
    //         ) {
    //             // handleTabChange('reviewPayments');
    //             setActiveTab('reviewPayments'); // Update the activeTab state
    //             // setIsShippingInfoValid(true);
    //         }
    //     }
    // };

    // const [initialValues, setInitialValues] = useState({});
    // const [isEditing, setIsEditing] = useState(false);

    // const token = localStorage.getItem('token');
    // console.log("user from place order: ", user);

    // Simulate fetching initial values from the database
    // useEffect(() => {
    //     const fetchInitialValues = async () => {
    //         // Make an API call to fetch initial values
    //         const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         setInitialValues(data);
    //     };

    //     fetchInitialValues();
    // }, []);

    // useEffect(() => {
    //     // Validate the shipping information here
    //     const isInfoValid =
    //         shippingInfo.firstName &&
    //         shippingInfo.lastName &&
    //         shippingInfo.email &&
    //         shippingInfo.mobileNo &&
    //         shippingInfo.street &&
    //         shippingInfo.country &&
    //         shippingInfo.province &&
    //         shippingInfo.city &&
    //         shippingInfo.postalcode &&
    //         selectedShippingMethod

    //     setIsShippingInfoValid(isInfoValid);
    // }, [shippingInfo, selectedShippingMethod]);




    return (
        <Container>
            <div className="row">
                <div className="col col-md-6 mt-5">
                    <ul className="nav nav-underline">
                        <li className={`nav-item ${activeTab === 'shipping' ? 'active' : ''}`}>
                            <a
                                className="nav-link"
                                href="#"
                                onClick={() => handleTabChange('shipping')}
                            >
                                Shipping
                            </a>
                        </li>
                        <li className={`nav-item ${activeTab === 'reviewPayments' ? 'active' : ''}`}>
                            <a
                                className="nav-link"
                                href="#"
                                onClick={() => handleTabChange('reviewPayments')}
                            >
                                Review & Payments
                            </a>
                        </li>
                    </ul>
                    {activeTab === 'shipping' && (
                        <div>
                            <MyAccount />
                            <h5 className="mt-3">Shipping Methods</h5>
                            <div className="row mb-3">
                                <div className="col-sm-4">
                                    <Form.Check
                                        type="radio"
                                        label="100.00"
                                        name="ninjaVan" // Unique name for this shipping method
                                        id="ninjaVan"
                                        className="mt-3"
                                        checked={selectedShippingMethod === 'ninjaVan'}
                                        onChange={() => setSelectedShippingMethod('ninjaVan')}
                                    />
                                </div>
                                <label htmlFor="shippingMethods" className="col-sm-4 col-form-label">
                                    Ninja Van
                                </label>
                            </div>
                            <Button
                                onClick={() => handleTabChange('reviewPayments')}
                                className="btn btn-dark btn-sm float-end mt-3 col-md-4"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                    {activeTab === 'reviewPayments' && (
                        <div>
                            <Form className="mt-5">
                                {/* Radio buttons for payment options */}
                                <Form.Group>
                                    <Form.Check
                                        type="radio"
                                        label="Cash On Delivery"
                                        name="cashOnDelivery"
                                        id="cashOnDelivery"
                                        className="mt-3"
                                        checked={selectedPaymentOption === 'cashOnDelivery'}
                                        onChange={() => setSelectedPaymentOption('cashOnDelivery')}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Credit Card / Debit Card"
                                        name="paymentOption"
                                        id="creditCard"
                                        className="mt-3"
                                        disabled
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Gcash"
                                        name="paymentOption"
                                        id="gcash"
                                        className="mt-3"
                                        disabled
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Paypal"
                                        name="paymentOption"
                                        id="paypal"
                                        className="mt-3"
                                        disabled
                                    />
                                </Form.Group>
                                <Button
                                    className="btn btn-dark btn-sm float-end mt-5 col-md-4"
                                    onClick={addOrder}
                                >
                                    Place Order
                                </Button>
                            </Form>
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="col col-md-6 mt-5">
                    <h5>Order Summary</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qnty</th>
                                <th scope="col">Sub-total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@mdo</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div> */}

        </Container>
    );
}

export default PlaceOrder;
