import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext';
import UserContext from '../UserContext';


function CartIcon() {
    const { cartState, cartDispatch } = useCart();
    // const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));
    const { user } = useContext(UserContext);

    // Function to fetch the user's cart items and total
    const fetchUserCart = async () => {
        try {
            const token = localStorage.getItem('token');

            // Make a GET request to the backend route that retrieves the cart items and total
            const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/my-cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // If the response status is 200 (OK), parse the JSON response
                const data = await response.json();

                // Dispatch an action to update the cart
                cartDispatch({ type: 'UPDATE_CART', payload: data });
            } else {
                // Handle error responses
                throw new Error('Failed to fetch cart data');
            }
        } catch (error) {
            // Handle any errors that may occur during the fetch
            console.error(error);
            throw error;
        }
    };

    // Fetch cart data when the component mounts, when a user logs in, and when a user logs out
    useEffect(() => {
        fetchUserCart();
    }, [cartDispatch]);



    return (
        <div className="position-relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="position-absolute top-0 start-100 translate-middle p-0 bg-warning border border-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: "1.2rem", height: "1.2rem" }}>
                <span className="visually-hidden">New alerts</span>
                <span className="text-sm" style={{ fontSize: "12px" }}>{ (user.id !== null) ? cartState.cartItems.length : 0}</span>
            </span>
        </div>
    );
}

export default CartIcon;
