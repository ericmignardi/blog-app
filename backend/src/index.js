import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./lib/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Operational" });
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
