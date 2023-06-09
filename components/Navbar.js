import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/router";

const Navbar = ({
  logOut,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef();
  const router = useRouter();

  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
    // console.log("sidebar in toggle func. before ",sidebar)
    setSidebar(!sidebar);
    // console.log("sidebar in toggle func. ",sidebar)
  };

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    // console.log("sidebar in useeffect is :",sidebar)
    let exempted = ['/checkout','/order','/orders','/myaccount']
    if(exempted.includes(router.pathname)){
      setSidebar(false);
    }
  });

  return (
    <div
      className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 sticky top-0 bg-white z-10 `}
    >
      <div className="logo  mx-5">
        <Link href={"/"}>
          <Image src="vercel.svg" alt="logo" width={100} height={30} />
        </Link>
      </div>
      <div className="nav mt-2 md:mt-0">
        <ul className="flex items-center space-x-6 font-bold md:text-md ">
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
      <div className="cart absolute items-center right-0 top-1 mx-5  flex">
        <div
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="absolute right-10 top-7 bg-pink-300 rounded-md px-5 w-40"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 text-md hover:text-white">My Account</li>
                </Link>
                <Link href={"orders"}>
                  <li className="py-1 text-md hover:text-white">My Orders</li>
                </Link>
                <li
                  onClick={logOut}
                  className="cursor-pointer py-1 text-md hover:text-white"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && (
            <MdAccountCircle
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="cursor-pointer text-2xl md:text-3xl mx-2"
            />
          )}
        </div>
        {!user.value && (
          <Link href={"/login"}>
            <button className="bg-indigo-500 px-2 py-1 rounded-md text-lg text-white mx-2 md:text-sm">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer text-2xl md:text-3xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-80 h-[100vh] sideCart absolute top-0 overflow-y-scroll transition-all ${
          sidebar ? "right-0" : "-right-96"
        } bg-pink-100 px-8 py-10`}
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
                  <div className="w-2/3 font-semibold">
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
        <div className="total font-bold mb-2">Total : ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="disabled:bg-indigo-300 flex mx-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            >
              <BsFillBagCheckFill className="mx-2 my-1" />
              Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearCart}
            className="disabled:bg-indigo-300 flex mx-2  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


