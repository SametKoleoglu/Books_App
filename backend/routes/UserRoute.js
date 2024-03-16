import express from "express";
import { deleteUser, getUser, getUsers } from "../controller/UserController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/delete/:id", deleteUser);

export default router;
