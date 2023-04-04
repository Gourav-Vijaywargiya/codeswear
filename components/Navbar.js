import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 sticky top-0 bg-white">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="vercel.svg" alt="logo" width={100} height={30} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoddies</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5  flex">
        <Link href ={"/login"}><MdAccountCircle className="cursor-pointer md:text-3xl mx-2" /></Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer md:text-3xl"
        />
      </div>

      <div
        ref={ref}
        className="w-72 sideCart absolute top-0 right-0 transform transition-transform translate-x-full bg-pink-100 px-8 py-10"
      >
        <h2 className="font-bold text-center text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-5 cursor-pointer text-3xl"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {cart && Object.keys(cart).length === 0 && (
            <div className="my-4 font-normal">Your cart is empty!!!</div>
          )}

          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-3 mb-16">
                  <div className="w-2/3 font-semibold">{cart[k].name}</div>
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
        <div className="total font-bold mb-2">Total : ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">
              <BsFillBagCheckFill className="mx-2 my-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
