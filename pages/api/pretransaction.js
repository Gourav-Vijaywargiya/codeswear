// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../Models/Order";
import Product from "../../Models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    const body = JSON.parse(req.body);
    // const body = req.body;
  if (req.method === "POST") {

    // Check if the cart value is tampered
    let product,sumTotal=0
    for(let item in body.cart){
      sumTotal += body.cart[item].price * body.cart[item].qty;
      product = await Product.findOne({slug:item});
      // to check if product is out of stock or not 
      if(product.availableQty<body.cart[item].qty){
        return res.status(200).json({"success": true,"error":"Some item from your cart was out of stock"})
      }
      // 
      if(product.price !=  body.cart[item].price){
        return res.status(200).json({"success": true,"error":"Price of some item has been changed in your cart"})
      }
    }
    if(sumTotal != body.subTotal){
      return res.status(200).json({"success": true,"error":"Price of some item has been changed in your cart"})
    }

   let order = new Order({
    email:body.email,
    orderId:body.oid,
    address:body.address,
    amount:body.subTotal,
    products:body.cart
   });
   await order.save();
  }
  res.send(200);
};

export default connectDb(handler);
