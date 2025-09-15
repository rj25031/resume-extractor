import express from "express";
import { getDetails, addResume,deleteResume,getResumes,updateResume } from "../controller/resumeController.js";
import upload from "../middleware/multer.js";
import { get } from "mongoose";
const router = express.Router();

router.post("/upload",upload.single('file'),getDetails);
router.post("/addResume",addResume);
router.delete("/deleteResume/:id",deleteResume);
router.get("/getResume",getResumes);
router.put("/updateResume/:id",updateResume);

export default router;