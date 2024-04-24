import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext';

function Cart() {
    const [cartData, setCartData] = useState({
        cartItems: [],
        total: 0,
    });

    const { cartDispatch } = useCart();

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [editIndex, setEditIndex] = useState(-1);
    const [newQuantity, setNewQuantity] = useState(0);
    const [originalQuantity, setOriginalQuantity] = useState(0);

    const handleEdit = async (index, currentQuantity, productId) => {
        console.log(index, " ", currentQuantity, " ", productId);
        if (editIndex === index) {
            const updatedQuantity = parseInt(newQuantity, 10);
    
            if (updatedQuantity > 0) {
                try {
                    // Make an API request to update the cart item's quantity
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/carts`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`, // Include the JWT token in the headers
                        },
                        body: JSON.stringify({
                            productId,
                            quantity: updatedQuantity,
                        }),
                    });
    
                    if (response.ok) {
                        // Update the local cart data on success
                        const updatedCartData = { ...cartData };
                        const item = updatedCartData.cartItems[index];
                        item.quantity = updatedQuantity;
                        item.subTotal = item.price * updatedQuantity; // Recalculate the subTotal
                        updatedCartData.total = updatedCartData.cartItems.reduce((total, item) => total + item.subTotal, 0); // Recalculate the total
                        setCartData(updatedCartData);
    
                        console.log("Quantity updated!");
                        setEditIndex(-1);
                    } else {
                        // Handle API error here
                        console.error('Failed to update quantity');
                    }
                } catch (error) {
                    // Handle any network or request errors here
                    console.error('Network error', error);
                }
            } else {
                // Display an error message or prevent saving if the new quantity is invalid
                // ...
                console.log("may error po!");
            }
        } else {
            setEditIndex(index);
            setNewQuantity(currentQuantity);
            setOriginalQuantity(currentQuantity);
        }
    };
    
    

    // const { updateCartItemCount } = useCart();

    const handleCancel = (index) => {
        setEditIndex(-1);
        setNewQuantity(0);
    };

    // Function to fetch the user's cart items and total
    const fetchUserCart = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the user's token from localStorage

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
                console.log("data from cart:",)
                setCartData(data);
                // updateCartItemCount(data.cartItems.length)
                setCartData(data);
                saveCartDataToLocalStorage(data); // Save the cart data to local storage    
               
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



    const handleRemove = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/carts/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                // Item removed successfully, update the cart data
                const updatedCartData = { ...cartData };
                // Find the removed item in cartItems array
                const removedItemIndex = updatedCartData.cartItems.findIndex((item) => item.productId === productId);
    
                if (removedItemIndex !== -1) {
                    // Remove the item from cartItems
                    updatedCartData.cartItems.splice(removedItemIndex, 1);
                    // Recalculate the total based on the remaining items
                    updatedCartData.total = updatedCartData.cartItems.reduce((total, item) => total + item.subTotal, 0);
                    setCartData(updatedCartData);

                    cartDispatch({ type: 'UPDATE_CART', payload: updatedCartData }); // Update cart state using cartDispatch

                    
                }
            } else {
                // Handle API error here
                console.error('Failed to remove item from the cart');
            }
        } catch (error) {
            // Handle any network or request errors here
            console.error('Network error', error);
        }
    };



    const saveCartDataToLocalStorage = (data) => {
        localStorage.setItem('cartData', JSON.stringify(data));
    };

    const loadCartDataFromLocalStorage = () => {
        const storedCartData = localStorage.getItem('cartData');
        if (storedCartData) {
            setCartData(JSON.parse(storedCartData));
        }
    };
    
    



    // Fetch cart data when the component mounts
    useEffect(() => {
        fetchUserCart();
         // Load cart data from local storage when the component mounts
         loadCartDataFromLocalStorage();
    }, []);


    function formatAsPHP(price) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(price);
    }



    // Function to navigate back to the /products route
    const handleContinueShopping = () => {
        navigate('/products');
    };

    const handleProceedToCheckout = () => {
        navigate('/orders/place-order');
    }

    return (
        <>
        <div className="container">
            <Table striped bordered hover responsive className='mt-5'>
                <thead>
                    <tr>
                        <th className='text-center'>Action</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td className=''>
                                <button className="remove-button btn btn-link mx-3" onClick={() => handleRemove(item.productId)}>
                                    <i className="fa fa-remove" style={{ color: 'red' }}></i>
                                </button>
                                {editIndex === index ? (
                                    <div>
                                        <button
                                            onClick={() => handleEdit(index, item.quantity, item.productId)} // Pass item.productId
                                            className="btn btn-link"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => handleCancel(index)}
                                            className="btn btn-link"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(index, item.quantity, item.productId)} // Pass item.productId
                                        className="btn btn-link"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td>{item.name} {item.productId}</td>
                            <td>{formatAsPHP(item.price)}</td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="number"
                                        value={newQuantity}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            if (value > 0) {
                                                setNewQuantity(value);
                                            }
                                        }}
                                    />
                                ) : (
                                    item.quantity
                                )}
                            </td>
                            <td>{formatAsPHP(item.subTotal)}</td>
                        </tr>
                    ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className='text-lg fs-3'>Total:</td>
                        <td><span className='text-warning text-lg fs-3'>{formatAsPHP(cartData.total)}</span></td>
                    </tr>
                </tfoot>
            </Table>
            <div className='d-flex justify-content-end'>
                {(cartData.cartItems.length === 0) ?
                    <>
                        <button className='btn btn-outline-dark' onClick={handleContinueShopping}>Go back to shopping</button>
                        <button className='btn btn-warning col-md-4 ms-5 text-white disabled' onClick={handleProceedToCheckout}>Proceed to checkout</button>
                    </>
                    :
                    <>
                        <button className='btn btn-outline-dark' onClick={handleContinueShopping}>Go back to shopping</button>
                        <button className='btn btn-warning col-md-4 ms-5 text-white' onClick={handleProceedToCheckout}>Proceed to checkout</button>
                    </>
                }
                
            </div>
            </div>
        </>
    );
}

export default Cart;
