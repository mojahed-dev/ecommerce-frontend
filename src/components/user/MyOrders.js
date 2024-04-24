import React, { useState, useEffect } from 'react';
import moment from 'moment';

function MyOrders() {

  const [activeTab, setActiveTab] = useState('pending'); // Set the initial active tab
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch orders when the component loads
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  console.log('orders: ', orders);


  useEffect(() => {
    // Filter orders based on the active tab
    const filtered = orders.filter((order) => {
      if (activeTab === 'pending') {
        return order.status === 'Pending';
      } else if (activeTab === 'shipped') {
        return order.status === 'Shipped';
      } else if (activeTab === 'delivered') {
        return order.status === 'Delivered';
      }
      return false;
    });

    setFilteredOrders(filtered);
  }, [activeTab, orders]);


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  function formatTimestamp(timestamp) {
    return moment(timestamp).format("MMM D, YYYY h:mm A");
  }

  function formatAsPHP(price) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(price);
  }


  return (
    <>
      <div>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('pending')}
            >
              Pending
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'shipped' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('shipped')}
            >
              Shipped
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'delivered' ? 'active' : ''}`}
              href="#"
              onClick={() => handleTabClick('delivered')}
            >
              Delivered
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane ${activeTab === 'pending' ? 'active' : ''}`}
            id="pending"
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qnty</th>
                  <th scope="col">Sub-total</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td colSpan="6"><span className='badge text-bg-warning'>Order Total: {formatAsPHP(order.total)}</span></td>
                    </tr>
                    {order.products.map((product, productIndex) => (
                      <tr key={productIndex}>
                        <th scope="row"></th>
                        <td>{product.name}</td>
                        <td>{formatAsPHP(product.price)}</td>
                        <td>{product.quantity}</td>
                        <td>{product.subTotal}</td>
                        <td>{formatTimestamp(order.transactionDate)}</td>
                        <td><span class="badge text-bg-info">{order.status}</span></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>


          </div>
          <div
            className={`tab-pane ${activeTab === 'shipped' ? 'active' : ''}`}
            id="shipped"
          >
            <table class="table mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qnty</th>
                  <th scope="col">Ordered Date</th>
                  <th scope="col">Sub-total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div
            className={`tab-pane ${activeTab === 'delivered' ? 'active' : ''}`}
            id="delivered"
          >
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {/* Render your Delivered orders data here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrders