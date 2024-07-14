import { Post } from "../models/index.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id: post_id } = req.params;
  try {
    const post = await Post.findById(post_id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  const { id: user_id } = req.params;
  try {
    const posts = await Post.find({ user_id });
    if (!posts)
      return res.status(404).json({ message: "No posts found for this ID" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const postToCreate = req.body;
  try {
    const post = new Post(postToCreate);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: post_id } = req.params;
  const postToUpdate = req.body;
  try {
    const post = await Post.findByIdAndUpdate(post_id, postToUpdate, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: post_id } = req.params;
  try {
    const postDeleted = await Post.findByIdAndDelete(post_id);
    if (!postDeleted)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
