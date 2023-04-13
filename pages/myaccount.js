import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myaccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const[password, setPassword] = useState("");
  const[cpassword, setCpassword] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/pincode`);
        let pinJson = await pins.json();

        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const fetchData = async (token) =>{
    let data ={token: token};
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/getuser`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    setName(response.name);
    setPhone(response.phone);
    setAddress(response.address);
    setState(response.state);
    setCity(response.city);
    setPincode(response.pincode);
  }

  const handleUserSubmit = async () =>{
    let data ={token: user.token,
    name,
    phone,
    address,
    pincode,
    city,
    state};
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/updateuser`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    toast.success("Data updated successfully", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handlePasswordSubmit = async () =>{
    let data ={token: user.token,
    password,
    cpassword};
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/updatepassword`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    toast.success(response.message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setPassword("");
    setCpassword("");
  }

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>My account-Codeswear</title>
      </Head>
      <div className="container mx-auto my-9">
      <ToastContainer
        position="top-right"
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
      <ToastContainer />
        <h1 className="text-xl font-bold text-center">Update Your account</h1>
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
            {user && user.token ? (
              <input
                value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly={true}
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
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
              District
            </label>
            <input
              onChange={handleChange}
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
              onChange={handleChange}
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div>
        <button
            onClick ={handleUserSubmit}
            className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            {/* <MdOutlinePayment className="mx-1 my-1 " /> */}
            Submit
          </button>
        </div>

        <h2 className="font-bold text-xl mt-5">2.Change Password</h2>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2 mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="px-2 w-1/2">
          <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div>
        <button
            onClick={handlePasswordSubmit}
            className="flex mx-2  text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
          >
            {/* <MdOutlinePayment className="mx-1 my-1 " /> */}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default myaccount;
