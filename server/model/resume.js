import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  summary: String,
  skills: String,
  education: String,
  certifications: String,
  projects: String,
  languages: String,
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;