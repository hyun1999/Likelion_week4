import { Router } from "express";

const routerPosts = Router();

let nextId = 4; // book 변수에 id를 설정합니다

let books = [ // book 배열
  { // book [0]
    id: 1,
    content: "자전거 도둑",
    writer: "박완서",
  },
  { // book [1]
    id: 2,
    content: "소나기",
    writer: "황순원",
  },
  { // book [2]
    id: 3,
    content: "마당을 나온 암탉",
    writer: "황선미"
  },
];
//실행 주소 http://localhost:3000/api/posts 
//----------------------글 목록 조회----------------------
routerPosts.get('/', (req, res) => {

  return res.json(books);

});
//-------------------------글 생성------------------------
routerPosts.post('/', (req, res) => { 
  books.push({
    id: nextId++,
    content: req.body.content,
    writer: req.body.writer,
  });
  res.json(books);
});
//--------------------특정 글 수정-------------------------
routerPosts.put('/', (req, res) => {
  const index = books.findIndex(book => book.id === req.body.postId);
  if (index === -1) { // 해당 책이 없을시
    return res.json({
      error: "That book does not exist",
    });
  }

  books[index] = {
    id: req.body.postId,
  };
  res.json(books[index]);
});
//------------------게시글 삭제---------------------

routerPosts.delete('/', (req, res) => {
  books = books.filter(book => book.id !== req.body.userId);
  res.json(books);
});

export default routerPosts;
