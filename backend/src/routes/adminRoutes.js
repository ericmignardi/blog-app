import { Router } from "express";
import {
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  login,
} from "../controllers/adminController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.get("/comments", auth, getAllComments);
router.get("/blogs", auth, getAllBlogsAdmin);
router.post("/deleteComment", auth, deleteCommentById);
router.post("/approveComment", auth, approveCommentById);
router.get("/dashboard", auth, getDashboard);

export default router;
