import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../Models/Product";
import Head from "next/head";

const hoodies = ({products}) => {
  return (
    <div>
       <Head>
        <title>Hoddie-Codeswear</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 &&<><p>Sorry all the hoodies are out of stock. New stock coming soon!!!</p></>}
            {Object.keys(products).map((item)=>{ return <div key = {products[item]._id}className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
              <Link passHref ={true} href={`/product/${products[item].slug}`}>
                <img
                  className="m-auto 0"
                  alt="ecommerce"
                  src={`${products[item].img}`}
                />

                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                  </h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('S') && <span className = 'border border-gray-300 mx-1 px-1'>S</span>}
                    {products[item].size.includes('M') && <span className = 'border border-gray-300 mx-1 px-1'>M</span>}
                    {products[item].size.includes('L') && <span className = 'border border-gray-300 mx-1 px-1'>L</span>}
                    {products[item].size.includes('XL') && <span className = 'border border-gray-300 mx-1 px-1'>XL</span>}
                    {products[item].size.includes('XXL') && <span className = 'border border-gray-300 mx-1 px-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('White') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </Link>
            </div>})}
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

  let products = await Product.find({category:"hoodies"});

  let hoodies ={};

  for(let item of products)
  {
      if(item.title in hoodies){
          if(!hoodies[item.title].color.includes(item.color) && item.availableQty>0){
              hoodies[item.title].color.push(item.color)
          }

          if(!hoodies[item.title].size.includes(item.size) && item.availableQty>0){
              hoodies[item.title].size.push(item.size)
          }
      }
      else{
        if(item.availableQty>0){
          hoodies[item.title] = JSON.parse(JSON.stringify(item));
              hoodies[item.title].color = [item.color];
              hoodies[item.title].size = [item.size];
          }
      }
  }
  return {
    props: {products: JSON.parse(JSON.stringify(hoodies))},
  };
}

export default hoodies;
