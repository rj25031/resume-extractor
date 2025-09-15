import Resume from "../model/resume.js";
import extractPdfData from "../utils/pdf.js";
import mongoose from "mongoose";

export const getDetails = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No PDF file uploaded" });
  }

  try {
    const text = await extractPdfData(file.buffer);
    res.status(200).json({ text });
  } catch (error) {
    console.error("Error extracting PDF:", error);
    res.status(500).json({ error: "Error extracting PDF data" });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addResume = async (req, res) => {
  const {
    name,
    email,
    phone,
    summary,
    skills,
    education,
    certifications,
    projects,
    languages,
  } = req.body;
console.log(req.body);
  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!phone) errors.push("Phone number is required");
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  try {
    const newResume = new Resume({
      name,
      email,
      phone,
      summary,
      skills,
      education,
      certifications,
      projects,
      languages,
    });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateResume = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid resume ID" });
  }
  const updates = req.body;
  try {
    const updatedResume = await Resume.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteResume = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid resume ID" });
  }
  try {
    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
