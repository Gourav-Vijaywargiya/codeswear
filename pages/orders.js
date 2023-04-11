import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const router = useRouter();
  const [orders,setOrders] = useState([]);

  useEffect(() => {

    const fetchMyOrders =async () =>{
      let res = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/myorders`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token })
      });
      let response = await res.json();
      setOrders(response.orders)
    }
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchMyOrders();
    }
  }, []);
  return (
      <div className="container  mx-auto min-h-screen">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <h1 className="font-bold text-xl text-center p-8">My Orders</h1>
                <table className="min-w-full text-left text-sm font-light ">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #Order Id
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>


                   { orders.map(item=>{
                   return <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.orderId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link className ="text-lg hover:text-blue-900 "href={'/order?id=' + item._id}>Details</Link>
                      </td>
                    </tr>})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};


export default Orders;
