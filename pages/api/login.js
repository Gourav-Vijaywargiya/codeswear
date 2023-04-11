// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../Models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const handler = async (req, res) => {
  const body = JSON.parse(req.body);
  // const body = req.body;
  if (req.method === "POST") {
    let user = await User.findOne({email: body.email});
   
    if(user) {
      const bytes  = CryptoJS.AES.decrypt(user.password, `${process.env.AES_SECRET_KEY}`);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if(body.email == user.email && body.password == decryptedData)
    {
        var token = jwt.sign({ email:user.email,name:user.name}, `${process.env.JWT_SECRET_KEY}`,{ expiresIn: '2d' });
        res.status(200).json({success: true, token,email:user.email});
    }
    else{
        return res.status(200).json({ success: false,error:"wrong email or password"});
    }
}
  else {
    return res.status(200).json({ success: false, error:"No user found"});
  }
}
};

export default connectDb(handler);
