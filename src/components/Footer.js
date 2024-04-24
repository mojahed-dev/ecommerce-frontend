import React from 'react';

function Footer() {
  return (
    <footer className="mt-5 text-center">
      <div className="container-fluid bg-light bg-gradient py-5">
        <div className="row">
          <div className="col-12 col-sm-4 text-center">
            <i className="fas fa-shipping-fast fa-2x mb-2 d-block"></i>
            Free Shipping
          </div>
          <div className="col-12 col-sm-4 text-center">
            <i className="fas fa-award fa-2x mb-2 d-block"></i>
            Lifestyle Rewards
          </div>
          <div className="col-12 col-sm-4 text-center">
            <i className="fas fa-thumbs-up fa-2x mb-2 d-block"></i>
            100% Authentic Guarantee
          </div>
        </div>
      </div>
      <p className='py-5 bg-secondary text-white'>© 2023  <a id="portfolio-link" href="https://mojahed-dev.github.io/webportfolio" target="_blank" rel="noopener noreferrer">
        Mojahed Habib
      </a> | Crafted with ❤️</p>
    </footer>
  );
}

export default Footer;
