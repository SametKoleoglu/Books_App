import Book from "../model/Book.js";
import { isValidObjectId, findDocumentById } from "../utils/index.js";

const allBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    console.log("Error at fetching books", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const getBooksByUploader = async (req, res) => {
  try {
    const uploaderId =  req.user._id;
    const books = await Book.find({ uploader: uploaderId });
    res.status(200).json(books);
  } catch (error) {
  }
};

const ABook = async (req, res) => {
  if (isValidObjectId(req.params.id, res)) return;

  try {
    const book = await findDocumentById(Book, req.params.id, res);

    if (!book) return;

    res.status(200).json(book);
  } catch (error) {
    console.log("Error at fetching book", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description, page } = req.body;

    const uploader = req.user._id;

    const existingBook = await Book.findOne({ title, author });

    if (existingBook) {
      return res
        .status(409)
        .json({ message: "book already exists", data: existingBook });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      page,
      uploader,
    });

    return res.status(201).json({ message: "success", data: newBook });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res
        .status(400)
        .json({ message: "validation error", validationErrors });
    } else {
      console.log("Error at creating book", error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
};

const updateBook = async (req, res) => {
  const { title, author, description, page, rating } = req.body;

  if (isValidObjectId(req.params.id, res)) return;

  try {
    const book = await findDocumentById(Book, req.params.id, res);

    if (!book) return;

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.page = page || book.page;
    book.rating = rating || book.rating;

    await book.save();

    return res
      .status(200)
      .json({ message: "Book updated successfully", UpdatedData: book });
  } catch (error) {
    console.log("Error at updating book", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteBook = async (req, res) => {
  console.log("Req User : ", req.user);

  if (isValidObjectId(req.params.id, res)) return;

  try {
    const book = await findDocumentById(Book, req.params.id, res);

    if (!book) return;

    await book.deleteOne();

    res
      .status(200)
      .json({ message: "book deleted successfully", deletedData: book });
  } catch (error) {
    console.log("Error at deleting book", error);
    return res.status(500).json({ message: "internal server error" });
  }
};



export {
  allBooks,
  createBook,
  ABook,
  updateBook,
  deleteBook,
  getBooksByUploader,
};
