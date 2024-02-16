import React from "react";
import StaffHeader from "./StaffHeader";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: "Attendance Marker", component: "AttendanceMarker" },
    { label: "Leave Request", component: "LeaveRequest" },
    { label: "Leave Status", component: "LeaveStatus" },
  ];

  return (
    <div>
      <StaffHeader buttons={buttons} defaultComponent="AttendanceMarker" />
    </div>
  );
};

export default StaffDashboard;
