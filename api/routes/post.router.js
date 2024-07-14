import express from "express";

import { PostController } from "../controllers/index.js";

const {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  deletePost,
  updatePost,
} = PostController;

const POST_ROUTES = {
  GET_ALL: "/post/",
  GET_BY_ID: "/post/:id",
  GET_BY_USER_ID: "/post/user/:id",
  CREATE: "/post/create",
  DELETE: "/post/delete/:id",
  UPDATE: "/post/update/:id",
};

const router = express.Router();

router.get(POST_ROUTES.GET_ALL, getAllPosts);
router.get(POST_ROUTES.GET_BY_ID, getPostById);
router.get(POST_ROUTES.GET_BY_USER_ID, getPostsByUserId);
router.post(POST_ROUTES.CREATE, createPost);
router.delete(POST_ROUTES.DELETE, deletePost);
router.put(POST_ROUTES.UPDATE, updatePost);

export default router;
