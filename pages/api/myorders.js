import mongoose from "mongoose";
import Order from "../../Models/Order";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY)
    // let orders = await Order.find({email:data.email,status:'Paid'}) this is used when i set up paytm payement option.
    let orders = await Order.find({email:data.email})
    res.status(200).json({orders})
  }
  

export default connectDb(handler);
