import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = ({items,cart,setCart}) => {

  const addToCart = (id,price,description,imgSrc)=>{

    const obj = {
      id,
      price,
      description,
      imgSrc

    }
    setCart([...cart, obj]);
    console.log("cart element = ", cart)
    toast.success('Item added successfully!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  if (!Array.isArray(items)) {
    return <div>No items available</div>;
  }
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            return (
              <>
              <div key={product.id}  className="col-lg-4 my-3 col-md-6 text-center " >
                <div className="card" style={{ width: "18rem", height:"100%"}}>
                  <Link to={`/product/${product.id}`} style={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center'

                  }}>
                  <img src={product.imgSrc} style={{width:"100px", height:"100px"}} className="card-img-top" alt="..." />

                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      {product.description}
                    </p>
                    <button className="btn btn-primary mx-3">{product.price} {" "}Rs</button>
                    <button onClick={()=>addToCart(product.id,product.price,product.description,product.imgSrc)} className="btn btn-warning">Add to Cart</button>
                  </div>
                </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
