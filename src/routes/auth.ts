import express from "express";
import { register } from "../authentication/auth";

export default (router: express.Router) => {
  router.post("/register", register);
};
