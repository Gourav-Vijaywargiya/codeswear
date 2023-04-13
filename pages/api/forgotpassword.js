// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../Models/Forgot";
import User from "../../Models/User.js"
import jsonwebtoken from 'jsonwebtoken' 

export default async function handler(req, res) {
    console.log(req.method);
    if(req.method === "POST"){
    if(req.sendMail){
        let token =body.token
        
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })
    
        let email = `We have sent you this email in response to your request to reset your password on Codeswear.com. 
    
        To reset your password, please follow the link below:
    
        <a href='${process.env.NEXT_PUBLIC_PORT}/forgot?token=${token}'>Click here to reset your password</a>
    
        <br/><br/>
    
        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to you My Account Page and Change your Password.
    
        <br/><br/>`
    
        res.status(200).json({ success:true, name: 'John Doe' })
    }
    else{
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
    }
}
  