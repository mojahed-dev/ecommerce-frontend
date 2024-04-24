import React from 'react';
import { Link } from 'react-router-dom';
import slide2 from '../images/slide2.webp';

function Banner() {
  const bannerStyle = {
    overflow: 'hidden',    // Prevent horizontal scroll
    width: '100%',         // Make the container 100% wide
    position: 'relative',  // Required for absolute positioning inside
  };

  const imageStyle = {
    width: '100%',         // Make the image 100% wide
    height: 'auto',        // Maintain aspect ratio
    objectFit: 'cover',    // Cover the container while maintaining aspect ratio
  };

  return (
    <div className="banner" style={bannerStyle}>
       <Link to="/products">
        <img
          src={slide2}
          alt="Banner Image"
          style={imageStyle}
        />
       </Link>
    </div>
   
  );
}

export default Banner;
