import { Router } from "express";
import auth from "../../models/auth";

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
      await auth.create({
        email: email,
        password: password,
      });
      res.json(
        {data:id}
      );
    }
  });

//-------------로그인--------------
routerAuth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(await auth.findOne({where:{email:email}}) && await auth.findOne({where:{password:password}}))
  {
    const{ id } = await auth.findOne({attributes:["id"],where:{email:email,}})
    res.json({data:id});
  }
  else{
    res.json({
      error: "User not exist",
    });
  }
});



export default routerAuth;