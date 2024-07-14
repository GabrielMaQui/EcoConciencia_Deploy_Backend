import express from "express";

import { UserController } from "../controllers/index.js";

const { createUser, getAllUsers, getUserById, updateUser, login } =
  UserController;

const USER_ROUTES = {
  GET_ALL: "/user/",
  GET_BY_ID: "/user/:id",
  CREATE: "/user/create",
  UPDATE: "/user/update/:id",
  LOGIN: "/user/login",
};

const router = express.Router();

router.get(USER_ROUTES.GET_ALL, getAllUsers);
router.get(USER_ROUTES.GET_BY_ID, getUserById);
router.post(USER_ROUTES.CREATE, createUser);
router.put(USER_ROUTES.UPDATE, updateUser);
router.post(USER_ROUTES.LOGIN, login);

export default router;
