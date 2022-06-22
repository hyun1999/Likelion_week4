
import { Router } from "express";
import auth from "../../models/auth";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();

const routerAuth = Router();

//-------------회원가입----------------

  routerAuth.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if(await auth.findOne({where:{email:email}}))
    {
      res.json({
        error: "User already exist",
      });
    }
    else{
      const{ id } = await auth.findAll({attributes:["id"],where:{email:email,}})
      const salt =await bcrypt.genSalt(10);
      const hashedPw =  await bcrypt.hash(password,salt);
      console.log(hashedPw);
      await auth.create({
        email: email,
        password: hashedPw,
      });

      res.json(
        {success:"success sign-up"}
      );
    }
  });

//-----------------로그인------------------
routerAuth.post('/login', async(req,res,) => {
  const { email, password } = req.body;

  const checkEmail = await auth.findOne({where:{email:email}});
  console.log(checkEmail);
  if(checkEmail){
    const checkPw = await auth.findOne({where:{password:password}});
    if(checkPw){
      const token = jwt.sign({
        email: req.body.email,
        writer: req.body.writer,
      }, process.env.JWT_SECRET, {
        expiresIn: '10m',
        issuer: 'JWT_study',
      });
      return res.json({
        message: '토큰이 발급되었습니다',
        token,
      });
    }
    else { 
      return res.json({
         error:{
             message: "패스워드 오류",
         },
     });
    }
  }else { 
    return res.json({
       error:{
           message: "이메일 오류",
       },
   });
};
}); 
export default routerAuth;