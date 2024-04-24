import React from 'react';
import { Link } from 'react-router-dom';
import Tshirt1 from '../images/tshirt1.jpg'

function PreviewProducts({data, breakpont}) {

    const { _id, name, price } = data;

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
  )
}

export default PreviewProducts