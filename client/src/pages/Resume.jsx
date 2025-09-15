import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layouts/Layout";
function Resume() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://resume-extractor-l7e9.onrender.com/api/user/getResume"
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Education
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Certifications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Languages
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.email}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.phone}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.skills}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.education}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.summary}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.certifications}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.projects}
                </td>
                <td className="px-6 py-4  text-sm text-gray-900">
                  {item.languages}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Resume;
