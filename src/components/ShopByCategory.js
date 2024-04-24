import React from 'react';
import { CardGroup } from 'react-bootstrap';
import cat1 from '../images/category1.jpg';
import cat2 from '../images/category2.jpg';
import cat3 from '../images/category3.jpg';

function ShopByCategory() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col col-md-12 featured-products d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: "#E3C9CC", padding: "30px" }}>
                    <h2>Shop by Category</h2>
                    <h6 className='fst-italic'>Explore Our Diverse Product Range</h6>
                </div>
            </div>
            <div className="row mt-5">
                <div class="col-12 col-md-4 mt-2 mt-md-0">
                    <div class="card cat-card d-flex flex-fill">
                        <img src={cat1} class="card-img" alt="..." />
                        <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title cat-title text-white">Men's Collection</h5>
                            {/* Add your additional content here if needed */}
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-4 mt-2 mt-md-0">
                    <div class="card cat-card d-flex flex-fill">
                        <img src={cat2} class="card-img" alt="..." />
                        <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title cat-title text-white">Women's Collection</h5>
                            {/* Add your additional content here if needed */}
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-4 mt-2 mt-md-0">
                    <div class="card cat-card d-flex flex-fill">
                        <img src={cat3} class="card-img" alt="..." />
                        <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                            <h5 class="card-title cat-title text-white">Bath and Body</h5>
                            {/* Add your additional content here if needed */}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default ShopByCategory