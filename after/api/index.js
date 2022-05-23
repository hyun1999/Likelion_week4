import { Router } from "express";
import routerPosts from "./posts";
import routerAuth from "./auth";

const router = Router();

router.use("/posts", routerPosts);
router.use("/auth", routerAuth);
export default router;
