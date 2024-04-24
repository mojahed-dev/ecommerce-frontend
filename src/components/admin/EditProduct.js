import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function EditProduct({ product, fetchData }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [sku, setSku] = useState('');
    const [images, setImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setStocks(data.stocks);
                setSku(data.sku);
                setImages(data.imagesUrl);
            });
        setShow(true);
    };

    // const extractPublicIdFromImageUrl = (imageUrl) => {
    //     // const pattern = /\/uploads\/([^/]+)/;
    //     // const pattern = /\/uploads\/([^/.]+)/; // Updated pattern to exclude file extension
    //     // const pattern = /\/uploads\/([^/]+?)(?:\.\w+)?$/;
    //     // const pattern = /\/v\d+\/([^/.]+)/;
    //     const pattern = /\/uploads\/([^/.]+)/;


    //     const match = imageUrl.match(pattern);
    //     console.log("match: ", match);
    //     if (match && match[1]) {
    //         return match[1];
    //     } else {
    //         return null;
    //     }
    // };

    const extractPublicIdFromImageUrl = (imageUrl) => {
        const parts = imageUrl.split('/');
        if (parts.length > 0) {
            const lastPart = parts[parts.length - 1];
            // Remove the file extension
            const publicId = lastPart.split('.')[0];
            return publicId;
        } else {
            return null;
        }
    };
    
    
    

    const removeImage = (index) => {
        const updatedImages = [...images];
        if (index >= 0 && index < updatedImages.length) {
            const removedImage = updatedImages.splice(index, 1);
            setImages(updatedImages);
            const publicId = extractPublicIdFromImageUrl(removedImage[0]);
            if (removedImage[0]) {
                // Extract public_id from the image URL
                
                if (publicId) {
                    setRemovedImages((prevRemovedImages) => [...prevRemovedImages, publicId]);
                    console.log("Updated removedImages:", publicId);
                } else {
                    console.log("Invalid removedImage:", removedImage);
                }

            } else {
                console.log("Invalid removedImage:", removedImage);
            }
        }
    }
    
    
    

    const addNewImages = (e) => {
        const files = e.target.files;
        const newImagesArray = Array.from(files);
        setNewImages((prevNewImages) => [...prevNewImages, ...newImagesArray]);
    };

    const editProduct = (e, productId) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stocks', stocks);
        formData.append('sku', sku);
    
        // Append existing images
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
    
        // Append new images
        newImages.forEach((newImage, index) => {
            formData.append(`newImages`, newImage);
        });
    
        
       // Append removed image IDs individually
        removedImages.forEach((removedImageId, index) => {
            formData.append(`removedImages[${index}]`, removedImageId);
        });




        console.log("formData: ", formData);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product Successfully Updated',
                    });
                    handleClose();
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Please try again',
                    });
                    handleClose();
                    fetchData();
                }
            });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => handleShow(product)}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => editProduct(e, product)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="product name"
                                autoFocus
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="price"
                                autoFocus
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stocks">
                            <Form.Label>Number of stocks:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="stocks"
                                autoFocus
                                required
                                value={stocks}
                                onChange={(e) => setStocks(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sku">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="SKU"
                                autoFocus
                                required
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="images">
                            <Form.Label>Images:</Form.Label>
                            <div className="thumbnails">
                                {images.map((image, index) => (
                                    <div key={index} className="thumbnail">
                                        {image && (
                                            <img
                                                src={image}
                                                alt={`Product Image ${index}`}
                                                className="thumbnail-image"
                                            />
                                        )}
                                        <span
                                            type="button"
                                            className="delete-icon"
                                            onClick={() => removeImage(index)}
                                        >
                                            &#10005;
                                        </span>
                                    </div>
                                ))}
                                {newImages.map((image, index) => (
                                    <div key={index} className="thumbnail">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`New Product Image ${index}`}
                                            className="thumbnail-image"
                                        />
                                        <span
                                            type="button"
                                            className="delete-icon"
                                            onClick={() =>
                                                setNewImages((prevImages) =>
                                                    prevImages.filter((_, i) => i !== index)
                                                )
                                            }
                                        >
                                            &#10005;
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Form.Control
                                type="file"
                                multiple
                                name="newImages"
                                onChange={addNewImages}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProduct;
