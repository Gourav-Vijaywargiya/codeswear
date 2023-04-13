import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const forgot = () => {
  const router = useRouter();

  const [ email,setEmail] = useState('');
  const [ password,setPassword] = useState('');
  const [ cpassword,setCpassword] = useState('');

  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }
  },[])

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const sendResetEmail = async () =>{
    let data = {
      email,
      sendMail:true
    }
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/forgotpassword`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    if(response.success){
      console.log("email has been sent successfully")
    }
    else{
      console.log("some error occurred");
    }
  }

  const resetPassword = async() =>{
    if(password == cpassword){
    let data = {
      password,
      sendMail:false
    }
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/forgotpassword`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await res.json();
    if(response.success){
      console.log("password has been changed successfully")
    }
    else{
      console.log("some error occurred");
    }
  }
  }

  return (
    <div>
      <Head>
        <title>Forgot Password-Codeswear</title>
      </Head>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-3xl tracking-tight">Forgot Password</h2>
        <span className="text-sm">
          or{" "}
          <Link href={"/login"} className="text-blue-500">
            Login
          </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        {router.query.token && 
          <div>
            <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
           <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                onChange = {handleChange}
                value={password}
                id ='password'
                name ='password'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                placeholder="password"
                required
              />
            </div>           
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="cpassword"
              >
                Confirm New Password
              </label>
              <input
                 onChange = {handleChange}
                 value={cpassword}
                id ='cpassword'
                name ='cpassword'
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                placeholder="confirm password"
                required
              />
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button disabled ={password != cpassword} onClick={resetPassword} className="disabled:bg-blue-300 appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
               Continue
              </button>
            </div>
            {password && cpassword && password != cpassword &&
             <div className="text-red-600">
              Password and confirm password not match
             </div>
            }
            {password && cpassword && password == cpassword &&
             <div className="text-green-600">
              Password and confirm password  match
             </div>
            }
          </div>
        </div>
          </div>
        }
        {!router.query.token && 
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                 onChange ={handleChange}
                 value={email}
                id ='email'
                name = 'email'
                autoComplete="email"
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                placeholder="email"
                required
              />
            </div>
                       
            <div className="w-full md:w-full px-3 mb-6">
              <button onClick={sendResetEmail} className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
               Continue
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default forgot;
