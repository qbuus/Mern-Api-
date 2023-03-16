import express from "express";
import { login, register } from "../authentication/auth";
import users from "./users";

export default (router: express.Router) => {
  router.post("/register", register);
  users(router);
  router.post("/login", login);
};
