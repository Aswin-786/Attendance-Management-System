import React from "react";
import { Link } from "react-router-dom";

const StaffHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div>
        <h1 className="text-xl font-bold">Staff Dashboard</h1>
      </div>
      <div className="flex gap-4">
        <Link to="/staff/attendance" className="text-blue-500 hover:underline">
          Attendance Marker
        </Link>
        <Link
          to="/staff/leave-request"
          className="text-blue-500 hover:underline"
        >
          Leave Request
        </Link>
        <Link
          to="/staff/leave-status"
          className="text-blue-500 hover:underline"
        >
          Leave Status
        </Link>
      </div>
    </div>
  );
};

export default StaffHeader;
