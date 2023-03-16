import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { get, merge } from "lodash";
import { getUserBySessionToken } from "controllers/users";

const SECRET = process.env.SECRET;

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) res.sendStatus(403);

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const isAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[`${SECRET}`];

    if (!sessionToken) res.sendStatus(403);

    const existingUser = await getUserBySessionToken(
      sessionToken
    );

    if (!existingUser) res.sendStatus(403);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
