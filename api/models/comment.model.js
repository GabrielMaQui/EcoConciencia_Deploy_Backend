import mongoose from "mongoose";

const commentSchema = {
  post_id: mongoose.Types.ObjectId,
  user_id: mongoose.Types.ObjectId,
  comment: String,
};

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(commentSchema, { timestamps: true }),
  "comment"
);

export default Comment;
