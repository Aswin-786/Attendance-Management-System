import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";

const AdminLeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeaveStatus = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/admin/leavestatus/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave status:", error);
      }
    };

    fetchLeaveStatus();
  }, [token]);
  const handleStatusUpdate = async (requestId, status) => {
    console.log(requestId);
    try {
      await axios.put(
        `${BASE_URL}/dashboard/admin/leavestatus/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }

    // Refetch leave requests after updating the status
    const response = await axios.get(
      `${BASE_URL}/dashboard/admin/leavestatus/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLeaveRequests(response.data);
  };
  // only show 'pending' status contents
  const pendingLeaveRequests = leaveRequests.filter(
    (request) => request.status === "pending"
  );

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-xl  font-bold mb-4 text-center underline">Admin Leave Status</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">Worker</th>
              <th className="px-4 py-2">Leave Date</th>
              <th className="px-4 py-2">Leave Type</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaveRequests.map((request, index) => (
              <tr
                key={request._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.worker.username}</td>
                <td className="border px-4 py-2">{request.leaveDate}</td>
                <td className="border px-4 py-2">{request.type}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(request._id, "accepted")
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(request._id, "rejected")
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveStatus;
