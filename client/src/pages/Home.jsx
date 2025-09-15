import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import extractResumeFields from "../utils/regexExtractor";
import Layout from "../components/layouts/Layout";
export default function Home() {
  const [resumeFields, setResumeFields] = useState({});

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      let response;
      if (file.type === "application/pdf") {
        response = await axios.post(
          "https://resume-extractor-l7e9.onrender.com/api/user/upload",
          formData
        );
      } else if (
        file.type === "application/png" ||
        file.type === "image/jpeg"
      ) {
        response = await axios.post(
          "https://512540245258.ngrok-free.app/api/user/upload/image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

          console.log("Response:", response.data); 
      }
      console.log("Response:", response);
      if (!response || !response.data) {
        console.log("Invalid response from server");
        return;
      }
      const resumeText = response?.data?.text;
      const extracted = extractResumeFields(resumeText);
      setResumeFields(extracted);
      console.log("extracted fields:", extracted);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeFields((prev) => ({ ...prev, [name]: value }));
  };
  console.log("resumeFields:", resumeFields);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8080/api/user/addResume",
        resumeFields
      );
      console.log(res);
    } catch (error) {
      console.error("Error submitting resume data:", error);
    }
  };
  return (
    <Layout>
      <div className="mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Resume Form
        </h1>

        <div>
          <label className="block text-gray-700">Upload Resume</label>
          <div className="mt-1 flex items-center">
            <PhotoIcon className="h-6 w-6 text-gray-400" />
            <input
              type="file"
              name="resume"
              className="ml-2 focus:outline-none"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircleIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="John Doe"
                value={resumeFields.name || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="john@example.com"
              value={resumeFields.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="+1 (555) 123-4567"
              value={resumeFields.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Summary</label>
            <textarea
              name="summary"
              rows="3"
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Brief summary about you"
              value={resumeFields.summary || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Skills</label>
            <textarea
              name="skills"
              rows="3"
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="your skills"
              value={resumeFields.skills || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Education</label>
            <textarea
              name="education"
              rows="3"
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="your education"
              value={resumeFields.education || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Certifications</label>
            <textarea
              name="certifications"
              rows="2"
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="your certifications"
              value={resumeFields.certifications || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Projects</label>
            <textarea
              name="projects"
              rows="3"
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="your projects"
              value={resumeFields.projects || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Languages</label>
            <input
              type="text"
              name="languages"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="languages you speak"
              value={resumeFields.languages || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
