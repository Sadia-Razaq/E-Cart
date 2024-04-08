import React, { useEffect, useState } from 'react'
import { items } from './Data'
import { useParams } from 'react-router-dom'
import Product from './Product'




const ProductDetail = ({cart,setCart}) => {
  const {id} = useParams()

  const [product, setProduct] = useState({})
  const [relatedproducts, setRelatedproducts] = useState([])

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

  useEffect(()=>{
    const filterProduct = items.filter((product)=>product.id == id)
    setProduct(filterProduct[0]);
    const relatedproducts = items.filter((prod)=>prod.category === product.category)
    setRelatedproducts(relatedproducts)
  },[id,product.category])

    return (
    <>
    <div className="container con">
      <div className="img">
        <img src={product.imgSrc} alt="" />
      </div>
      <div>
      <h1 className="card-title">{product.title}</h1>
                    <p className="card-text">
                      {product.description}
                    </p>
                    <button className="btn btn-primary mx-3">{product.price} {" "}Rs</button>
                    <button onClick={()=>addToCart(product.id,product.price,product.description,product.imgSrc)} className="btn btn-warning">Add to Cart</button>
      </div>
    </div>
    <h1 className='text-center'>Related Products</h1>
    <Product  cart = {cart} setCart = {setCart}  items={relatedproducts}/>
    </>
  )
}

export default ProductDetail