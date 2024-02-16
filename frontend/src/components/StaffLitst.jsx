import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewStaff from "./ViewStaff"; 
import { BASE_URL } from "../shared/config";

const StaffList = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); 
    const token = localStorage.getItem("token");
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/admin/staffdetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setError("Failed to fetch staff list. Please try again later.");
      }
    };

    fetchWorkers();
  }, []);

  const handleButtonClick = (userId) => {
    setSelectedUserId(userId); 
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center md:py-5 py-3 underline">
        Staff List
      </h2>
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Index
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff Name
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workers.map((worker, index) => (
              <tr
                key={worker._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {worker.username}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {worker.role}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleButtonClick(worker._id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the ViewStaff component dynamically based on selectedUserId */}
      {selectedUserId && <ViewStaff userId={selectedUserId} />}
    </div>
  );
};

export default StaffList;
