import Blog from "../models/blogModel.js";

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
    // Upload image and store url in db
  } catch (error) {
    console.error("Error in create: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
