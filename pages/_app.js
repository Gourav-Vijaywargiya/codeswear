import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    let subt = 0;
    let keys = Object.keys(cart);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      // subt += myCart[keys[i]]?.price *  myCart[keys[i]]?.qty
      subt += myCart[keys[i]] ? myCart[keys[i]].price * myCart[keys[i]].qty : 0;
    }
    let updatedValue = 0;
    setSubTotal((prev) => {
      updatedValue = subt;
      localStorage.setItem("price", JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode]["qty"] = newCart[itemCode].qty - qty;
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({});
    let newCart={}
    newCart[itemCode] ={ qty: 1, price, name, size, variant } ;
    setCart(newCart);
    saveCart(newCart);
    setSubTotal(price);
    router.push("/checkout");
  };

  const logOut = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    toast.success("logged out successfully", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setKey(Math.random());
    router.push("/");
  };

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
      if (localStorage.getItem("price")) {
        setSubTotal(JSON.parse(localStorage.getItem("price")));
      }
      const myuser = JSON.parse(localStorage.getItem("myuser"));
      if (myuser) {
        setUser({ value: myuser.token,email:myuser.email });
      }
      setKey(Math.random());
    } catch (error) {
      console.error(error);
    }
  }, [router.query]);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime='450'
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     {key && <Navbar
        logOut={logOut}
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />}
      <Component
        buyNow={buyNow}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
