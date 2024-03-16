import express from "express";
import {
  ABook,
  allBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../controller/BookController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", allBooks);
router.get("/:id", ABook);
router.post("/create", createBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", authenticateUser, deleteBook);

export default router;
