import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";
import Graph from "./Graph";

const ViewStaff = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('0');
  const token = localStorage.getItem("token");

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

    setReportData(null);
    fetchUserData();
    fetchAttendanceData();
  }, [userId, token]);

  const handleFetchReport = async (event) => {
    try {
      setLoadingReport(true);
      const response = await axios.get(
        `${BASE_URL}/dashboard/admin/report/${userId}/${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("An error occurred while fetching report data.");
    } finally {
      setLoadingReport(false);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log(event.target.value);
    //api
    handleFetchReport();
  };

 const filterReportByMonth = (reportType) => {
   if (!reportData) return [];
   const data =
     reportType === "attendance"
       ? reportData.attendanceData
       : reportData.leaveRequests;
   //if (!selectedMonth) return data;
  return data;
  //  return data.filter((item) => {
  //    const month =
  //      new Date(
  //        reportType === "attendance" ? item.date : item.leaveDate
  //      ).getMonth() + 1;
  //    return month === parseInt(selectedMonth);
  //  });
 };

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFetchReport}
            disabled={loadingReport}
          >
            {loadingReport ? "Fetching Report..." : "Fetch Report"}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {reportData && (
        <div className="mt-5">
          <div className="mb-4">
            <label htmlFor="monthSelect" className="mr-2">
              Select Month:
            </label>
            <select
              id="monthSelect"
              onChange={handleMonthChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">All</option>
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center underline py-5 ">
            Attendance Report
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-800 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-800 px-4 py-2">Date</th>
                  <th className="border border-gray-800 px-4 py-2">Check In</th>
                  <th className="border border-gray-800 px-4 py-2">
                    Check Out
                  </th>
                  <th className="border border-gray-800 px-4 py-2">
                    Total Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterReportByMonth("attendance").map((attendance) => (
                  <tr key={attendance._id}>
                    <td className="border border-gray-800 px-4 py-2">
                      {attendance.date}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {attendance.checkIn}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {attendance.checkOut}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {attendance.totalHours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center underline py-5 ">
            Leave Report
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-800 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-800 px-4 py-2">Date</th>
                  <th className="border border-gray-800 px-4 py-2">Type</th>
                  <th className="border border-gray-800 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filterReportByMonth("leave").map((leaveRequest) => (
                  <tr key={leaveRequest._id}>
                    <td className="border border-gray-800 px-4 py-2">
                      {leaveRequest.leaveDate}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {leaveRequest.type}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {leaveRequest.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Graph attendanceData={attendanceData} />
    </div>
  );
};

export default ViewStaff;
