
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import JacketImage from '../images/jacket.jpg';
import Tshirt1 from '../images/tshirt1.jpg'


function ProductsCard({ productProps }) {
    const [isLiked, setIsLiked] = useState(false);
    const { _id, name, price } = productProps;
    // console.log("productsProps: ", productProps)

    // Toggle the heart icon color
    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    function formatAsPHP(price) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(price);
    }


    return (
        <>
        <div className="col-12 col-sm-8 col-md-6 col-lg-2 p-3">
        <Link to={`/products/${_id}`} className="card-link">
            <div className="card card-hover">
                <img src={Tshirt1} alt="tshirt" />
                <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link like">
                        <i className="fa fa-heart"></i>
                    </a>
                </div>
                <div className="card-body">
                    <h6 className="card-title my-0">{name}</h6>
                    <div className="price text-success my-0 text-warning text-sm">{formatAsPHP(price)}</div>
                </div>
            </div>
            </Link>
        </div>
        </>
    );

}

export default ProductsCard