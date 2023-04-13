// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "/home/bs/nextjs tutorial/codeswear/Models/User.js"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken' 
var CryptoJS = require("crypto-js");

const handler = async(req,res) =>{
    const body = JSON.parse(req.body);
    if(req.method === "POST"){
        let token = body.token;
        let user = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY)
        if(body.password==body.cpassword)
        {
        let dbuser = await User.findOneAndUpdate({email:user.email},{password:CryptoJS.AES.encrypt(body.password, `${process.env.AES_SECRET_KEY}`).toString()});
        res.status(200).json({message:"password updated successfully"})
        }
        else{
            res.status(200).json({message:"password and confirm password not matched"})
        }
    }
    else{
        res.status(400).json({error:"error"})
    }

}


export default connectDb(handler)
  