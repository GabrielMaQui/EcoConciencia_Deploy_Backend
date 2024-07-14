import express from "express";

import { CommentController } from "../controllers/index.js";

const {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  getCommentsByUserId,
  createComment,
  deleteComment,
  updateComment,
} = CommentController;

const COMMENT_ROUTES = {
  GET_ALL: "/comment/",
  GET_BY_ID: "/comment/:id",
  GET_BY_POST_ID: "/comment/post/:id",
  GET_BY_USER_ID: "/comment/user/:id",
  CREATE: "/comment/create",
  DELETE: "/comment/delete/:id",
  UPDATE: "/comment/update/:id",
};

const router = express.Router();

router.get(COMMENT_ROUTES.GET_ALL, getAllComments);
router.get(COMMENT_ROUTES.GET_BY_ID, getCommentById);
router.get(COMMENT_ROUTES.GET_BY_POST_ID, getCommentsByPostId);
router.get(COMMENT_ROUTES.GET_BY_USER_ID, getCommentsByUserId);
router.post(COMMENT_ROUTES.CREATE, createComment);
router.delete(COMMENT_ROUTES.DELETE, deleteComment);
router.put(COMMENT_ROUTES.UPDATE, updateComment);

export default router;
