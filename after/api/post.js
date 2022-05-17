import { Router } from "express";

const routerPost = Router();

let books = [ // book 배열
  { // books [0]
    id: 1,
    content: "자전거 도둑",
    writer: 1,
  },
  { // books [1]
    id: 2,
    content: "소나기",
    writer: 2,
  },
  { // books [2]
    id: 3,
    content: "마당을 나온 암탉",
    writer: 3
  },
];

//------------------글 개별 항목 조회-------------------------
//실행 주소 http://localhost:3000/api/post
routerPost.get('/', (req, res) => {  
  const index = books.findIndex(books => books.id === req.body.id);
  if (index === -1) {
    return res.json({
      error: "That book does not exist",
    });
  }
  res.json(books.filter(books => books.id === req.body.id)[0]);
});

export default routerPost;
