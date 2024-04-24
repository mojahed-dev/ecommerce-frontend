import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AddProduct from '../../pages/admin/AddProduct';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

function ProductsAdminView({ productsData, fetchData }) {
  const navigate = useNavigate();

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products to display per page

  // Calculate the index of the first and last product to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the current products to display based on the pagination
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // You can keep the existing logic for truncating product descriptions here
  }, [productsData]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="my-4">Admin Dashboard</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus"></i> <AddProduct fetchData={fetchData} />
        </button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>SKU</th>
            <th colSpan="2" className="w-md-1">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                {product.description.length > 30
                  ? product.description.substring(0, 30) + '...'
                  : product.description}
              </td>
              <td>{product.price}</td>
              <td className={product.isActive ? 'text-success' : 'text-danger'}>
                {product.isActive ? 'Available' : 'Unavailable'}
              </td>
              <td>{product.sku}</td>
              <td className="text-center">
                <button className="btn-sm">
                  <EditProduct product={product._id} fetchData={fetchData} />
                </button>
              </td>
              <td className="text-center">
                <button className="btn-sm">
                  <ArchiveProduct
                    product={product._id}
                    isActive={product.isActive}
                    fetchData={fetchData}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(productsData.length / productsPerPage) }).map(
            (_, index) => (
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
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default ProductsAdminView;
