import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart,setCart] = useState({});
  const [subTotal,setSubTotal] = useState(0);

  useEffect(()=>{
    try {
      if(localStorage.getItem('cart'))
      {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }
      if(localStorage.getItem('price'))
      {
        setSubTotal(JSON.parse(localStorage.getItem('price')))
      }
    } catch (error) {
      console.error(error);
    }
  },[])


  const saveCart = (myCart) =>{
    localStorage.setItem('cart',JSON.stringify(myCart));

    let subt=0;
    let keys = Object.keys(cart);
    console.log(keys)
    for(let i =0 ;i<keys.length;i++){
      // subt += myCart[keys[i]]?.price *  myCart[keys[i]]?.qty 
      subt += (myCart[keys[i]]? myCart[keys[i]].price *  myCart[keys[i]].qty:0) 
    }
    let updatedValue = 0;
    setSubTotal(prev => {
      updatedValue = subt;
      localStorage.setItem('price', JSON.stringify(updatedValue));
      return updatedValue;
    });
  }

  const addToCart =(itemCode,qty,price,name,size,variant) =>{
    let newCart = cart;
    if(itemCode in newCart){
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else{
      newCart[itemCode] = {qty:1,price,name,size,variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const removeFromCart =(itemCode,qty,price,name,size,variant) =>{
    let newCart = cart;
    if(itemCode in newCart){
      newCart[itemCode]['qty'] = newCart[itemCode].qty - qty;
    }

    if(newCart[itemCode]['qty']<=0)
    {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = () =>{
    setCart({});
    saveCart({});
    alert('Cart has been cleared')
  }

  return (
  <>
  <Navbar cart ={cart} addToCart ={addToCart} removeFromCart ={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component cart ={cart} addToCart ={addToCart} removeFromCart ={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
  <Footer/>
  </>
  )
}
