import Comment from "../model/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { bookId, content, userId } = req.body;

    const newComment = await Comment.create({
      content: content,
      postedBy: userId,
      book: bookId,
    });

    return res.status(201).json({
      message: "comment created successfully",
      comment: newComment,
    });
  } catch (err) {
    console.log("Error at creating comment", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getCommentsForBook = async (req, res) => {
  try {
    const comments = await Comment.find({ book: req.params.id }).populate(
      "postedBy"
    );

    return res
      .status(201)
      .json({ message: "Comments for book fetched successfully", comments });
  } catch (error) {
    console.log("Error at getCommentsForBook", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
