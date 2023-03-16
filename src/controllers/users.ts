import { UserModel } from "models/users";

export const getUsers = () => {
  UserModel.find();
};

export const getUserByEmail = (email: string) => {
  UserModel.findOne({ email });
};

// if logged it
export const getUserBySessionToken = (sessionToken: string) => {
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
};

// get by id
export const getUserById = (id: string) => {
  UserModel.findById({ id });
};

// type record stands for an object <keys, values>
export const createUser = (newValues: Record<string, any>) => {
  new UserModel(newValues)
    .save()
    .then((user) => user.toObject());
};

// delete by finding id
export const deleteUserById = (id: string) => {
  UserModel.findOneAndDelete({ _id: id });
};

// chech if exists [id] and update newValues
export const updateUserById = (
  id: string,
  newValues: Record<string, any>
) => {
  UserModel.findByIdAndUpdate(id, newValues);
};
