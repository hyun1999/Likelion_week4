import { Router } from "express";
import routerPosts from "./posts";
import routerPost from "./Post";

const router = Router();

router.use("/posts", routerPosts);
router.use("/post", routerPost);

export default router;
