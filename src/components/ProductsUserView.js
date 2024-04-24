import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';

function ProductsUserView({productsData}) {

    // console.log("productsData: ", productsData)

    const [products, setProducts] = useState([]);

    
	useEffect(() => {
		const productsArr = productsData.map(product => {

			if(product.isActive === true){
				return (
					<ProductsCard productProps={product} key={product._id}/>
				)
			} else {
				return null
			}

		})

		setProducts(productsArr);


	}, [productsData]);

  return (
    <>
		<div className="row">
			<div className="col col-md-12 featured-products d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: "#e4e4e4", padding: "30px" }}>
				<h1>Men's Collection</h1>
				{/* <h6 className='fst-italic'>Bring Home your <strong>Brio's</strong> Favorites</h6> */}
			</div>
		</div>
       <div className="card-group container mt-5">
            {products}
       </div>
        
       
       
        {/* <ProductsCard /> */}
    </>
  )
}

export default ProductsUserView