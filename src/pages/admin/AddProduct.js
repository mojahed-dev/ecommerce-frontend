import React, { useState, useContext, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making HTTP requests
import UserContext from '../../UserContext';

function AddProduct({ fetchData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [sku, setSku] = useState('');
  const [mainImageUrl, setMainImage] = useState(null);
  const [imagesUrl, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const { user } = useContext(UserContext);

  const createProduct = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stocks', stocks);
    formData.append('sku', sku);

    // Append all images as 'imagesUrl'
    for (const image of imagesUrl) {
      formData.append('imagesUrl', image);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/add-product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
        });
        fetchData();
        hideModal();
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Unsuccessful Product Creation',
          text: data.message || 'Product creation failed.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the product.',
      });
    }
  };


  const hideModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleMainImageChange = (e) => {
    console.log("mainImageUrl sa handle banda: ", mainImageUrl);

    // Assuming this is an input change event
    setMainImage(e.target.files[0]); // Set the selected File object, not the input element
  };

  const handleImagesChange = (e) => {
    const imageFiles = Array.from(e.target.files);
    setImages(imageFiles); // Set an array of File objects, not the input elements
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={openModal}>
        Add Product
      </Button>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createProduct(e)}>
            <Form.Group>
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stocks:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of stocks"
                required
                value={stocks}
                onChange={(e) => {
                  setStocks(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>SKU:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SKU"
                required
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Additional Images:</Form.Label>
              <div className="thumbnails" onDrop={onDrop} onDragOver={handleDragOver}>
                {imagesUrl.map((image, index) => (
                  <div key={index} className="thumbnail">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product Image ${index}`}
                      className="thumbnail-image"
                    />
                    <span
                      className="delete-icon"
                      onClick={() => removeImage(index)}
                    >
                      &#10005;
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                name="imagesUrl"
                multiple
                ref={fileInputRef}
                onChange={handleImagesChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-5">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProduct;
