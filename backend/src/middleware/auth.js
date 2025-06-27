import jsonwebtoken from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("Error in auth: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
