import React from "react";
import Link from "next/link";
import {
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
const Checkout = ({ cart, clearCart, addToCart, removeFromCart,subTotal,subt }) => {
  return (
    <div className="container mx-8 sm:m-auto">
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
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
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
            type="phone"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 w-1/2 mb-4">
          <label
            htmlFor="city"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label
            htmlFor="pincode"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Pin Code
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
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
                  <div className=" font-semibold">{cart[k].name}</div>
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
          <span className ="total font-bold">Total : ₹{subTotal}</span>
      </div>
      <div className="mx-2">
          <Link href={"/checkout"}>
            <button className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">
              <MdOutlinePayment className="mx-1 my-1" />
              Pay ₹{subt}
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Checkout;
