import { Router } from "express";
import posts from '../../models/posts';

const routerPosts = Router();

//실행 주소 http://localhost:3000/api/posts 

//----------------------글 목록 조회----------------------
routerPosts.get('/', async (req, res) => {
	const postDatas = await posts.findAll({});
  res.json({
		data: postDatas
	});
});
//----------------------글 개별 항목 조회-----------------
routerPosts.get('/:postId', async (req, res) => {  
  //const index = books.findIndex(book => book.id === parseInt(req.params.postId));
  const PostId = parseInt(req.params.postId);
  const postDatas = await posts.findAll({where: {id: PostId}});
  if (postDatas == "") {
    return res.json({
      error: "That book does not exist",
    });
  }
  res.json(postDatas);
});
//-------------------------글 생성------------------------
routerPosts.post('/', async (req, res) => { 
  let userId = req.header('X-User-Id');
  const { content } = req.body;
  if(userId === "1"){
     await posts.create({
      content: content,
      writer: userId,
    });
  }
	const postDatas = await posts.findOne({
    attributes:["id"],
    where:{
      content:content,
    }
  });
  res.json({
		data: postDatas
	});
});
//--------------------특정 글 수정-------------------------
routerPosts.put('/:postId', async(req, res) => {
  const userId = req.header('X-User-Id');
  const { postId } = req.params;
  const { content } = req.body;
  if(await posts.findOne({attributes:["writer"],where:{writer:userId,}})){ 
    await posts.update({content :content},{where:{id:postId}});
    res.json(
      {data:postId}
    );
    }
  else{
      return res.json({
        error: "Cannot modify post",
      });
  }
});
//------------------게시글 삭제---------------------
routerPosts.delete('/:postId', async (req, res) => {
  let userId = req.header('X-User-Id');
  let { postId } = req.params;
  console.log(userId);
  if(await posts.findOne({attributes:["writer"],where:{writer:userId,}}))
  {
    await posts.destroy({
      where :{
        id :postId,
      }
    });
    res.json({
      data:"Successfully deleted"
    })
  }
  else{
    res.json({
      error:"Cannot delete post"
    })
  }
});

export default routerPosts;
