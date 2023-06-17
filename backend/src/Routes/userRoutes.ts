import { Router } from "express";
import {
  addUser, deleteUser, getUserByEmail, getUserById, getallUsers, loginUser, updateUser,
} from "../Controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const userRoutes = Router();

userRoutes.post("", addUser);
userRoutes.get("",verifyToken, getallUsers);
userRoutes.get("/:id",verifyToken, getUserById);
userRoutes.get("/email/:email",verifyToken, getUserByEmail);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id",verifyToken, deleteUser);
userRoutes.post("/login", loginUser);
export default userRoutes;