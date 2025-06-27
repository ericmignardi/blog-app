import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import fs from "fs";
import imagekit from "../lib/imagekit.js";
import main from "../lib/gemini.js";

export const create = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Required Fields" });
    }

    // Image Upload
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Image Optimization
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // compression
        { format: "webp" }, // formating
        { width: "1280" }, // resizing
      ],
    });

    const image = optimizedImageUrl;

    // Storing Blog in Database
    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished,
    });

    res
      .status(201)
      .json({ success: true, message: "Successfully Created Blog" });
  } catch (error) {
    console.error("Error in create: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const readAll = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error in readAll: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Invalid ID" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error in read: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });
    res
      .status(200)
      .json({ success: true, message: "Successfully Deleted Blog" });
  } catch (error) {
    console.error("Error in deleteById: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully Updated Blog" });
  } catch (error) {
    console.error("Error in togglePublish: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.status(201).json({
      success: true,
      message: "Successfully Submitted Comment For Review",
    });
  } catch (error) {
    console.error("Error in createComment: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const readComments = async (req, res) => {
  try {
    const { id } = req.body;
    const comments = await Comment.find({ blog: id, isApproved: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error in readComments: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate blog content for this topic in simple text format"
    );
    res.status(200).json({ success: true, content });
  } catch (error) {
    console.error("Error in generateContent: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
