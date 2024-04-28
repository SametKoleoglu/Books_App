import express from "express";
import {
  getRatingsForBook,
  createARate,
} from "../controller/RatingController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/book/:id", getRatingsForBook);
router.post("/", authMiddleware.authenticateUser, createARate);

export default router;
