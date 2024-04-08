import React, { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { items } from './Data'
import { FaBeer } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import logo from '../assets/logo.png'; 






const Navbar = ({setData,cart}) => {

  const location = useLocation()

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")

  const filterByCategory = (category) =>{
    const element = items.filter((product) => product.category === category)
    // console.log(element)
    setData(element)
  }

  const filterByPrice = (price) =>{
    const element = items.filter((product) => product.price >= price)
    // console.log(element)
    setData(element)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("")

  }


  return (
    <>

    <header className='sticky-top'>
        <div className="nav-bar">
            <Link to={'/'} className="brand" style={{color:"#1e847f"}}><img src={logo} style={{width:"50px", height:"30px"}}/></Link>
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                type="text"  
                placeholder='Search Products'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
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

        {location.pathname == '/' && ( <div className="nav-bar-wrapper">
            {/* <div className="items">Filter by {"->"}</div> */}
            <div className="items" onClick={()=>setData(items)}>All Products</div>
            <div className="items" onClick={()=>filterByCategory('mobiles')}>Mobiles</div>
            <div className="items"  onClick={()=>filterByCategory('laptops')}>Laptops</div>
            <div className="items"  onClick={()=>filterByCategory('tablets')}>Tablets</div>
            <div className="items" onClick={()=>filterByPrice(29999)}> {">="}29999</div>
            <div className="items" onClick={()=>filterByPrice(49999)}> {">="}49999</div>
            <div className="items" onClick={()=>filterByPrice(69999)}> {">="}69999</div>
            <div className="items" onClick={()=>filterByPrice(89999)}> {">="}89999</div>

            
        </div>)}

       
    </header>
    
    </>
  )
}

export default Navbar