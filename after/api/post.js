import { Router } from "express";

const routerPost = Router();



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

//------------------글 개별 항목 조회-------------------------
//실행 주소 http://localhost:3000/api/post
routerPost.get('/', (req, res) => {  
  const index = students.findIndex(students => students.id === req.body.id);
  if (index === -1) {
    return res.json({
      error: "That student does not exist",
    });
  }
  res.json(students.filter(students => students.id === req.body.id)[0]);
});

export default routerPost;
