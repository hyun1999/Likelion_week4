import { Router } from "express";

const routerAuth = Router();
let nextId = 4;
let auths = [
    {
        id:1,
        email: "test@email.com",
        password: "pa$$w0rd"
    },
    {
        id:2,
        email: "test@email.com",
        password: "asd"
    },
    {
        id:3,
        email: "test@email.com",
        password: "asdf"
    }
];
//-------------회원가입----------------
routerAuth.post('/register', (req, res) => {
    const index = auths.findIndex(auth => auth.email === req.body.email);
    if (index === -1) { // 해당 계정이 없을 경우
      auths.push({
        id: nextId++,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({id:nextId});
    }

    return res.json({
      error: "User already exist",
    });
  });

//-------------로그인--------------
routerAuth.post('/login', (req, res) => {
  const index = auths.findIndex(auth => auth.email === req.body.email && auth.password === req.body.password);
  if (index === -1) { // 해당 계정이 없을 경우
    return res.json({
      error: "User not exist",
    });
  }
  return res.json({
      id: index+1})
  });



export default routerAuth;