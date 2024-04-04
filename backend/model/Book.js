import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      required: true,
      min: 1,
    },
    uploader:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true, //created_at, updated_at alanlarını oluşturacak!!!
  }
);

export default mongoose.model("Book", bookSchema);
