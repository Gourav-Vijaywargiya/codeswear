// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../Models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    const body = JSON.parse(req.body);
    // const body = req.body;
  if (req.method === "POST") {
    const {name,email} = body;
    let user = new User({name,email,password:CryptoJS.AES.encrypt(body.password, `${process.env.AES_SECRET_KEY}`).toString()});
    await user.save();
    return res.status(200).json({ success: "User signup successfully" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
