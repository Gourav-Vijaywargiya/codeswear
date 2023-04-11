import React, { useEffect } from "react";
import Link from "next/link";
import {
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import Head from "next/head";
import { useState } from "react";

const Checkout = ({
  user,
  cart,
  clearCart,
  addToCart,
  removeFromCart,
  subTotal,
  subt,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  // const [user,setUser] = useState({value:null});

  const initiatePayment = async() =>{
    let oid = Math.floor(Math.random() * Date.now());
    const data = {cart ,subTotal,oid,name,email:email,phone,pincode,address}
    let res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/pretransaction`,{
      method: "POST",
      headers:{
        contentType: "application/json"
      },
      body: JSON.stringify(data)
    })
    let response = await res.json();
  }

  const handleChange = async(e) => {
   
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if(e.target.value.length == 6){
        let pins = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/pincode`);
        let pinJson = await pins.json();
  
        if(Object.keys(pinJson).includes(e.target.value)){
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        }
        else{
          setState('');
          setCity('');
        }
      }
      else{
        setState('');
        setCity('');
      }
    }
    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        address.length > 3 &&
        pincode.length > 3
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('myuser'));
  //   if(user.token){
  //     setUser(user);
  //     setEmail(user.email);

  //   }
  // },[])
  return (
    <div className="container mx-8 sm:m-auto">
      <Head></Head>
      <h1 className="font-bold text-center my-8 text-3xl">Checkout</h1>
      <h2 className="font-bold text-xl">1.Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2 mb-4">
          <label
            htmlFor="name"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label
            htmlFor="email"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Email
          </label>
          {user.value? <input
            value={user.email}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            readOnly={true}
          />:<input
            onChange={handleChange}
            value={email}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          /> }
          
        </div>
      </div>
      <div className="px-2 w-f">
        <label
          htmlFor="address"
          className="leading-7 text-sm text-gray-600 font-semibold"
        >
          Address
        </label>
        <textarea
          onChange={handleChange}
          value={address}
          id="address"
          name="address"
          cols="30"
          rows="2"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label
            htmlFor="phone"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Mobile No.
          </label>
          <input
            onChange={handleChange}
            value={phone}
            type="phone"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2">
          <label
            htmlFor="pincode"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Pin Code
          </label>
          <input
            onChange={handleChange}
            value={pincode}
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2 mb-4">
          <label
            htmlFor="city"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            City
          </label>
          <input
            onChange ={handleChange}
            value={city}
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           
          />
        </div>

        <div className="px-2 w-1/2 mb-4">
          <label
            htmlFor="State"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            State
          </label>
          <input
            onChange ={handleChange}
            value={state}
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           
          />
        </div>
      </div>

      <h2 className="font-bold text-xl">2.Review Cart Items</h2>
      <div className="sideCart  bg-pink-100 px-8 py-1 m-4">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-normal">Your cart is empty!!!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-3 mb-16">
                  <div className=" font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center justify-center w-1/3 font-semibold">
                    <AiOutlineMinusCircle
                      onClick={() =>
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="mx-1 text-5xl cursor-pointer"
                    />{" "}
                    {cart[k].qty}{" "}
                    <AiOutlinePlusCircle
                      onClick={() =>
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="mx-1 text-5xl cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold">Total : ₹{subTotal}</span>
      </div>
      <div className="mx-2 ">
        <Link
          href={"/checkout"}
          // style ={{pointerEvents:'none'}}
        >
          <button
            disabled={disabled}
            onClick ={initiatePayment}
            className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            <MdOutlinePayment className="mx-1 my-1 " />
            Pay ₹{subt}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
