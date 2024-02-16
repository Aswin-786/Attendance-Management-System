import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selectors/userDetails";
import { BASE_URL } from "../shared/config";

const AttendanceMarker = () => {
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const userId = useRecoilValue(userIdState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculate total hours
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out times.");
      return;
    }
    const totalHours = calculateTotalHours(checkIn, checkOut);

    console.log(checkInAMPM);
    // Make API call to save attendance
    try {
      const response = await axios.post(
        `${BASE_URL}/dashboard/staff/attendance/${userId}`,
        {
          checkIn,
          checkOut,
          checkInAMPM,
          checkOutAMPM,
          date,
          totalHours,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Attendance saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const calculateTotalHours = (checkIn, checkOut) => {
    // Parse check-in and check-out times
    const checkInTime = parseTime(checkIn);
    const checkOutTime = parseTime(checkOut);

    // Calculate total milliseconds
    const totalMilliseconds = checkOutTime - checkInTime;

    // If check-out is before check-in (crossing midnight), add a day to totalMilliseconds
    if (totalMilliseconds < 0) {
      const midnight = 24 * 60 * 60 * 1000; // milliseconds in a day
      return ((midnight + totalMilliseconds) / (1000 * 60 * 60)).toFixed(2);
    } else {
      return (totalMilliseconds / (1000 * 60 * 60)).toFixed(2);
    }
  };

  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const milliseconds = (hours * 60 + minutes) * 60 * 1000;
    return milliseconds;
  };

  // Determine AM or PM for check-in and check-out based on the entered time
  const inferAMPM = (time) => {
    const [hours] = time.split(":").map(Number);
    return hours >= 12 ? "PM" : "AM";
  };

  // Calculate min date (today)
  const today = new Date().toISOString().split("T")[0];

  const checkInAMPM = inferAMPM(checkIn);
  const checkOutAMPM = inferAMPM(checkOut);
  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg md:my-8 my-3">
      <h2 className="text-xl font-bold mb-4 underline text-center">Attendance Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Check-In:</label>
          <input
            type="time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Check-Out:</label>
          <input
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
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

export default AttendanceMarker;
