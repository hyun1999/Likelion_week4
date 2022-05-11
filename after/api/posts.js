import { Router } from "express";

const routerPosts = Router();

let nextId = 4; // students 변수에 id를 설정합니다

let students = [ // students 배열
  { // students[0]
    id: 1,
    name: 'Ronaldo',
    major:'computer engineering',
  },
  { // students [1]
    id: 2,
    name: 'Messi',
    major: 'chemical engineering',
  },
  { // students [2]
    id: 3,
    name: 'Henry',
    major: 'physics'
  },
];
//실행 주소 http://localhost:3000/api/posts 
//----------------------글 목록 조회----------------------
routerPosts.get('/', (req, res) => {

  return res.status(200).json(students);

});
//-------------------------글 생성------------------------
routerPosts.post('/', (req, res) => { 
  students.push({
    id: nextId++,
    name: req.body.name,
    major: req.body.major,
  });
  res.json(students);
});
//--------------------특정 글 수정-------------------------
routerPosts.put('/', (req, res) => {
  const index = students.findIndex(students => students.id === req.body.postId);
  const postId = req.body.postId;
  const userId = req.body.userId;
  if (userId===postId) { // userId와 postId가 같을 경우
    students[index] = {
        id: req.body.postId,
        content: req.body.content
    };
    }
  else{
    return res.json({ // userId와 postId가 다를 경우
      error: "userId와 postId가 일치하지 않습니다.",
  });
  }
  res.json(students);
});
//------------------게시글 삭제---------------------

routerPosts.delete('/', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  if(postId === userId){
    students = students.filter(students => students.id !== req.body.postId);
    res.json("Successfully deleted")
  }
  else{
    return res.json("Cannot delete post")
  }
});

export default routerPosts;
