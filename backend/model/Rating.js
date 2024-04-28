import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    ratingBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rating", RatingSchema);
