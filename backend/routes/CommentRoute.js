import express from "express";
import { createComment,getCommentsForBook } from "../controller/CommentController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/create",authMiddleware.authenticateUser, createComment);

router.get("/book/:id", getCommentsForBook);

export default router