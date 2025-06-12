import express from "express";
import multer from "multer";
import {
  createAttachment,
  getAllAttachments,
  getAttachmentById,
  updateAttachment,
  deleteAttachment,
} from "../controllers/attachment.controller.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Ensure "uploads/" exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/create", upload.single("documentFile"), createAttachment);
router.get("/getall", getAllAttachments);
router.get("/:id", getAttachmentById);
// router.put("/update/:id", updateAttachment);
router.put("/update/:id", upload.single("documentFile"), updateAttachment);

router.delete("/delete/:id", deleteAttachment);

export default router;