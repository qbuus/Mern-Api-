import express from "express";
import { isAuth, isOwner } from "middlewares";
import { deleteUser, getAllUsers } from "authentication/users";

export default (router: express.Router) => {
  router.get("/users", isAuth, getAllUsers);
  router.delete("/users/:id", isAuth, isOwner, deleteUser);
};
