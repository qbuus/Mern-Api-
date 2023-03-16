import express, { Request, Response } from "express";
import { deleteUserById, getUsers } from "controllers/users";

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getUsers();

    return res.sendStatus(200).json(users).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deleteUser).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
