import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {
  getUserByEmail,
  createUser,
} from "../controllers/users";
import { random, authentication } from "helpers";

const SECRET = process.env.SECRET as string;

export const login = async (
  res: express.Response,
  req: express.Request
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const Hash = authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.salt !== Hash) {
      res.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie(SECRET, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
