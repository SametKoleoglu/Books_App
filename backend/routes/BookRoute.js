import express from "express";
import {
  ABook,
  allBooks,
  createBook,
  deleteBook,
  updateBook,
  getBooksByUploader,
} from "../controller/BookController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", allBooks);
// router.get("/:id", ABook);
router.get("/uploader",authenticateUser, getBooksByUploader);
router.post("/create",authenticateUser, createBook);
router.put("/update/:id",authenticateUser, updateBook);
router.delete("/delete/:id", authenticateUser, deleteBook);

export default router;
