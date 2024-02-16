import React, { useEffect } from "react";
import StaffHeader from "./StaffHeader";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../store/selectors/userDetails";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const userRole = useRecoilValue(userRoleState);
  console.log('staff:',userRole);
  useEffect(() => {
    
    if (!userRole) {
      navigate("/register");
    }
  }, [userRole, navigate]);

  if (userRole !== "staff") {
    navigate("/register");
    return null;
  } 

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
