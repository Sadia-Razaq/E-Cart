import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { RiShoppingCartFill } from 'react-icons/ri';
import logo from '../assets/logo.png';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  const filterByPrice = (price) => {
    const element = items.filter((product) => product.price >= price);
    setData(element);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  const handlePriceFilter = (minPrice) => {
    filterByPrice(minPrice);
    togglePriceFilter(); // Close the dropdown after selecting a price range
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={'/'} className="brand" style={{ color: '#1e847f' }}>
            <img src={logo} style={{ width: '50px', height: '30px' }} alt="Logo" />
          </Link>
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <Link to={'/cart'} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <RiShoppingCartFill />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {location.pathname == '/' && (
          <div className="nav-bar-wrapper">
            <div className="items" onClick={() => setData(items)}>
              All Products
            </div>
            <div className="items" onClick={() => filterByCategory('mobiles')}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCategory('laptops')}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCategory('tablets')}>
              Tablets
            </div>
            {/* Price Filter Dropdown */}
            <div className="items price-filter" onClick={togglePriceFilter}>
              Price Range
              {showPriceFilter && (
                <div className="price-filter-dropdown">
                  <div className="items" onClick={() => handlePriceFilter(0)}>All</div>
                  <div className="items" onClick={() => handlePriceFilter(29999)}>{"≥"}29999</div>
                  <div className="items" onClick={() => handlePriceFilter(49999)}>{"≥"}49999</div>
                  <div className="items" onClick={() => handlePriceFilter(69999)}>{"≥"}69999</div>
                  <div className="items" onClick={() => handlePriceFilter(89999)}>{"≥"}89999</div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
