import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selectors/userDetails";
import { BASE_URL } from "../shared/config";
import LeaveStatus from "./LeaveStatus";
import { useNavigate } from "react-router-dom";

const LeaveRequest = () => {
  const userId = useRecoilValue(userIdState);
  const [date, setDate] = useState("");
  const [leaveType, setLeaveType] = useState("full_day");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    try {
      // Make API call to submit the new leave request
      const response = await axios.post(
        `${BASE_URL}/dashboard/staff/leave-request/${userId}`,
        {
          leaveDate: date,
          type: mapLeaveTypeToSchemaValue(leaveType),
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Leave request submitted:", response.data);
      // Reset form after successful submission
      setDate("");
      setLeaveType("full_day");
      setReason("");
      setError("");
    } catch (error) {
      // Handle error response
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "Leave request for this date already exists"
      ) {
        setError(
          "Leave request for this date already exists. You cannot submit multiple leave requests for the same date."
        );
      } else {
        console.error("Error submitting leave request:", error);
        setError("Failed to submit leave request. Please try again later.");
      }
    }
  };

  // Helper function to map client-side leave type value to schema value
  const mapLeaveTypeToSchemaValue = (leaveType) => {
    switch (leaveType) {
      case "full_day":
        return "full day";
      case "half_day_morning":
        return "half day morning";
      case "half_day_afternoon":
        return "half day afternoon";
      default:
        return leaveType;
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg md:my-5 my-3">
      <h2 className="text-2xl font-bold mb-4 underline text-center">Leave Request</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block mb-1">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Leave Type:</label>
          <div>
            <input
              type="radio"
              id="full_day"
              name="leaveType"
              value="full_day"
              checked={leaveType === "full_day"}
              onChange={() => setLeaveType("full_day")}
              className="mr-2"
            />
            <label htmlFor="full_day">Full Day</label>
          </div>
          <div>
            <input
              type="radio"
              id="half_day_morning"
              name="leaveType"
              value="half_day_morning"
              checked={leaveType === "half_day_morning"}
              onChange={() => setLeaveType("half_day_morning")}
              className="mr-2"
            />
            <label htmlFor="half_day_morning">Half Day (Morning)</label>
          </div>
          <div>
            <input
              type="radio"
              id="half_day_afternoon"
              name="leaveType"
              value="half_day_afternoon"
              checked={leaveType === "half_day_afternoon"}
              onChange={() => setLeaveType("half_day_afternoon")}
              className="mr-2"
            />
            <label htmlFor="half_day_afternoon">Half Day (Afternoon)</label>
          </div>
        </div>
        <div>
          <label htmlFor="reason" className="block mb-1">
            Reason:
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequest;
