import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../UserContext';
import { useCart } from '../CartContext';

function SingleProduct() {
    const { user } = useContext(UserContext);
    const { cartDispatch } = useCart(); // Access the cart context

    const { productId } = useParams();
    const token = localStorage.getItem('token');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    // const [mainImage, setMainImage] = useState(''); // State to store the main image
    const [images, setImages] = useState([]); // State to store the array of images

    useEffect(() => {
        // Fetch product details, including images
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setImages(data.imagesUrl); // Set the array of image URLs
                console.log("DATA: ", data)
            });
    }, [productId]);

    function AddToCart(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/carts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    cartDispatch({ type: 'ADD_TO_CART', payload: data });
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added to Cart',
                    });
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: 'Please log in first to add items to your cart. Enjoy shopping!',
                    });
                }
            });
    }

    function formatAsPHP(price) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(price);
    }

    return (
        <div className="container mt-4 justify-content-center" id="single-pro">
            <div className="row">
                <div className="col-md-4">
                    {/* Main Product Image and Additional Images Carousel */}
                    <Carousel showArrows={true}>
                        <div className='main-image'>
                            {images.length > 0 && images[0] ? (
                                <img
                                    src={images[0]}
                                    alt="Product Image"
                                    className="img-fluid additional-image"
                                />
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                        {images.map((image, index) => (
                            <div key={index}>
                                {image && (
                                    <img
                                        src={image}
                                        alt={`Product Image ${index}`}
                                        className="img-fluid additional-image"
                                    />
                                )}
                            </div>
                        ))}
                    </Carousel>
                </div>



                <div className="col-md-8 d-flex flex-column">
                    <div className="product-details flex-fill">
                        <h1>{name}</h1>
                        <h2 className="text-muted">{formatAsPHP(price)}</h2>
                        <p>{description}</p>

                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control pQuantity"
                                id="quantity"
                                name="quantity"
                                min="1"
                                step="1"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="buy d-flex align-items-end">
                        <button className="btn btn-warning mx-2 col-md-6 col-sm-12" onClick={(e) => AddToCart(e)}>
                            <FontAwesomeIcon icon={faShoppingCart} size="sm" /> Add to Cart
                        </button>
                        <button className="btn btn-outline-dark mx-2">
                            <FontAwesomeIcon icon={faHeart} size="sm" />
                        </button>
                        <button className="btn btn-link mx-2">Cart(0)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
