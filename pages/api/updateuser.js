// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "/home/bs/nextjs tutorial/codeswear/Models/User.js"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken' 
const handler = async(req,res) =>{
    const body = JSON.parse(req.body);
    if(req.method === "POST"){
        let token = body.token;
        let user = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY)
        let dbuser = await User.findOneAndUpdate({email:user.email},{address:body.address,city:body.city,state:body.state,pincode:body.pincode,phone:body.phone,name:body.name,});
        res.status(200).json({success:true})
    }
    else{
        res.status(400).json({error:"error"})
    }

}


export default connectDb(handler)
  