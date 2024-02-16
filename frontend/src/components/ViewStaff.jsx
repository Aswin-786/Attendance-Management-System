import React, { useState, useEffect, } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";
import Dummy from "./Graph";
import Graph from "./Graph";

const ViewStaff = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const token = localStorage.getItem("token");

  console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/staff/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/admin/attendance/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("An error occurred while fetching attendance data.");
      }
    };

    fetchUserData();
    fetchAttendanceData();
  }, [userId, token]); // Fetch user data and attendance data when userId or token changes


  return (
    <div className="max-w-md mx-auto border mt-5 p-4 rounded-md border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-center underline py-5 ">
        User Details
      </h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : userData ? (
        <div className="m-2 border rounded-md p-3 border-gray-300 flex flex-col gap-2">
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Location:</strong> {userData.location}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Graph attendanceData={attendanceData} />
    </div>
  );
};

export default ViewStaff;
