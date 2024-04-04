import express from "express";
import { deleteAllUser, deleteUser, getUser, getUsers,updateUser } from "../controller/UserController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/updateUser",authMiddleware.authenticateUser,updateUser);
router.delete("/delete/:id", deleteUser);
router.delete("/deleteAllUser", deleteAllUser);

export default router;
