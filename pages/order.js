import { useRouter } from "next/router";
import React from "react";
import mongoose from "mongoose";
import Order from "../Models/Order";
import Head from "next/head";

const MyOrder = ({order}) => {
  const router = useRouter();
  const {id} = router.query;
  const products = order.products;
  return (
    <div>
      <Head>
        <title>Order-Codeswear</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CodesWear
              </h2>
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-4">
                Order Id:#{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your Order has been successfully placed.Your payment status is : {order.status}
              </p>
              <p className="leading-relaxed mb-4">
                Order placed on: {Date(order.createdAt)}
              </p>
              <div className="flex border-b-2 mb-4 text-center">
                <a className="flex-grow py-2 text-lg px-1 ">
                  Item Description
                </a>
                <a className="flex-grow py-2 text-lg px-1 ">
                  Quantity
                </a>
                <a className="flex-grow py-2 text-lg px-1 ">
                  Item Total price
                </a>
              </div>

             { Object.keys(products).map(key=>{
              return <div key = {key} className="flex border-t border-gray-200 py-2 text-center">
                     <span className="text-gray-500 ml-5" style ={{'maxWidth':'10rem'}}>
                     { products[key].name} ({products[key].size}/{products[key].variant})
                     </span>
                     <span className="mx-24  text-gray-900">{products[key].qty}</span>
                     <span className="md:mx-12 mr-12 text-gray-900">₹{products[key].qty*products[key].price}</span>
                    </div>})}

              <div className="flex mt-2">
                <span className="title-font font-medium text-2xl text-gray-900 ">
                  Total : ₹{order.amount}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.mongoUri);
  }

  let order = await Order.findById(context.query.id);

  
  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    },
  };
}

export default MyOrder;
