import { Router } from "express";

const routerPosts = Router();

let nextId = 4; // book 변수에 id를 설정합니다

let books = [ // book 배열
  { // book [0]
    id: 1,
    content: "자전거 도둑",
    writer: 1,
  },
  { // book [1]
    id: 2,
    content: "소나기",
    writer: 2,
  },
  { // book [2]
    id: 3,
    content: "마당을 나온 암탉",
    writer: 3
  },
];
//실행 주소 http://localhost:3000/api/posts 

//----------------------글 목록 조회----------------------
routerPosts.get('/', (req, res) => {

  return res.json(books);

});
//----------------------글 개별 항목 조회-----------------
routerPosts.get('/:postId', (req, res) => {  
  const index = books.findIndex(book => book.id === parseInt(req.params.postId));
  if (index === -1) {
    return res.json({
      error: "That book does not exist",
    });
  }
  res.json(books[index]);
});
//-------------------------글 생성------------------------
routerPosts.post('/', (req, res) => { 
  let userId = req.header('X-User-Id');
  if(userId === "1"){
    books.push({
      id: nextId++,
      content: req.body.content,
      writer: req.body.writer,
    });
  }
  res.json({id:nextId-1});
  
});
//--------------------특정 글 수정-------------------------
routerPosts.put('/:postId', (req, res) => {
  let userId = parseInt(req.header('X-User-Id'));
  let postId = parseInt(req.params.postId);
  if(userId ===1){
    const index = books.findIndex(book => book.id === userId);
    if (index === -1) {
      return res.json({
        error: "Cannot modify post",
      });
    }
    books[index] = {
      content: req.body.content,
      id: postId
    };
    res.json(
      {id:books[index].id}
  );
  }
});
//------------------게시글 삭제---------------------

routerPosts.delete('/:postId', (req, res) => {
  let userId = parseInt(req.header('X-User-Id'));
  let postId = parseInt(req.params.postId);
  if(userId === 1){
  books = books.filter(book => book.writer !== postId);
  res.json({data:"Successfully deleted"});
  }else{
    res.json({
      error:"Cannot delete post"
    })
  }
});

export default routerPosts;
