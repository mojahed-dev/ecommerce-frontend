import React from 'react'
import ProductsUserView from '../components/ProductsUserView'
import Banner from '../components/Banner'
import BestSellerItem from '../components/BestSellerItem'
import Carousel from '../components/Carousel'
import FeaturedProducts from '../components/FeaturedProducts'
import ShopByCategory from '../components/ShopByCategory'

function Home() {
  return (
    <>
      <Banner />
      <FeaturedProducts />
      {/* <BestSellerItem /> */}
      <ShopByCategory />
    </>
    
  )
}

export default Home