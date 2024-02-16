import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selectors/userDetails";
import { BASE_URL } from "../shared/config";

const LeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/staff/leave-status/${userId}`
        );
        const sortedRequests = response.data.sort((a, b) => {
          return new Date(a.leaveDate) - new Date(b.leaveDate);
        });
        setLeaveRequests(sortedRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Leave Status</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">Leave Date</th>
              <th className="px-4 py-2">Leave Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.leaveDate}</td>
                <td className="border px-4 py-2">{request.type}</td>
                <td className="border px-4 py-2">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveStatus;
