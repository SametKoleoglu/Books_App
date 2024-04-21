import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postedBy: {
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

export default mongoose.model("Comment", commentSchema)