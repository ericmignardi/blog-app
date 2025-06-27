import { Router } from "express";
import {
  create,
  createComment,
  deleteById,
  read,
  readAll,
  readComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/add", upload.single("image"), auth, create);
router.get("/all", readAll);
router.get("/:id", read);
router.post("/delete", auth, deleteById);
router.post("/update", auth, togglePublish);
router.post("/addComment", createComment);
router.post("/comments", readComments);

export default router;
