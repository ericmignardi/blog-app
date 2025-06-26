import jsonwebtoken from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error in login: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
