import React, { useEffect, useState } from 'react';
import moment from 'moment';


function Orders() {
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    let token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch ordered products from the backend
        // Make sure to replace 'API_ENDPOINT' with your actual API endpoint
        fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setOrderedProducts(data.orderedProduct);
            })
            .catch((error) => {
                console.error('Error fetching ordered products: ', error);
            });
    }, []);


    // Function to handle the status filter change
    const handleStatusFilterChange = (event) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        setCurrentPage(1); // Reset to the first page when changing filters
    };

    // Calculate the total number of pages, taking into account when ordered products are not available yet
    const totalPages = orderedProducts ? Math.ceil(orderedProducts.length / itemsPerPage) : 1;

    // Function to handle pagination page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the ordered products to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const orderedProductsToDisplay = (orderedProducts || []).slice(startIndex, endIndex);

    function formatAsPHP(price) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(price);
    }

    function formatTimestamp(timestamp) {
        return moment(timestamp).format("MMM D, YYYY h:mm A");
      }


    return (
        <>  
            <div className="container-fluid">
            <div className="my-3 col-md-2">
                <label htmlFor="statusFilter" className="form-label"></label>
                <select
                    id="statusFilter"
                    className="form-select"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover responsive">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile No.</th>
                            <th scope="col">Address</th>
                            <th scope="col">Item</th>
                            <th scope="col">Qty x Price</th>
                            <th scope="col">Sub-total</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment | Shipping</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedProductsToDisplay.map((orderedProduct, index) => (
                            <tr key={orderedProduct._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{`${orderedProduct.userId.firstName} ${orderedProduct.userId.lastName}`}</td>
                                <td>{orderedProduct.userId.mobileNo}</td>
                                <td>{`${orderedProduct.userId.street} ${orderedProduct.userId.city} ${orderedProduct.userId.province} ${orderedProduct.userId.postalcode} ${orderedProduct.userId.country}`}</td>
                                <td>{orderedProduct.productId.name}</td>
                                <td>{`${orderedProduct.quantity} x ${formatAsPHP(orderedProduct.productId.price)}`}</td>
                                <td>{formatAsPHP(orderedProduct.subTotal)}</td>
                                <td>{formatTimestamp(orderedProduct.orderId.transactionDate)}</td>
                                <td>{`${orderedProduct.orderId.paymentMethod} | ${orderedProduct.orderId.shippingMethod}`}</td>
                                <td><span class="badge rounded-pill text-bg-info">{orderedProduct.orderId.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            </div>
        </>
    );
}

export default Orders;
