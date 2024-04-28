import Rating from "../model/Rating.js";

export const createARate = async (req, res) => {
  try {
    const { bookId, rate, userId } = req.body;

    const newRate = await Rating.create({
      rate: rate,
      ratingBy: userId,
      book: bookId,
    });

    return res.status(201).json({
      message: "Rating created successfully",
      rating: newRate,
    });
  } catch (err) {
    console.log("Error at creating rate", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getRatingsForBook = async (req, res) => {
  try {
    const ratings = await Rating.find({ book: req.params.id }).populate(
      "ratingBy"
    );

    return res
      .status(201)
      .json({ message: "Ratings for book fetched successfully", ratings });
  } catch (error) {
    console.log("Error at getRatingsForBook", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

