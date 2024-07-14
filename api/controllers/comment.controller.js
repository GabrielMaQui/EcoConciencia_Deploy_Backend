import { Comment } from "../models/index.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  const { id: comment_id } = req.params;
  try {
    const comment = await Comment.findById(comment_id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByUserId = async (req, res) => {
  const { id: user_id } = req.params;
  try {
    const comments = await Comment.find({ user_id });
    if (!comments)
      return res.status(404).json({ message: "No comments found for this ID" });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  const { id: post_id } = req.params;
  try {
    const comments = await Comment.find({ post_id });
    if (!comments)
      return res.status(404).json({ message: "No comments found for this ID" });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const commentToCreate = req.body;
  try {
    const comment = new Comment(commentToCreate);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { id: comment_id } = req.params;
  const commentToUpdate = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      comment_id,
      commentToUpdate,
      {
        new: true,
      }
    );
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id: comment_id } = req.params;
  try {
    const commentDeleted = await Comment.findByIdAndDelete(comment_id);
    if (!commentDeleted)
      return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
