import React, { useState } from "react";
import AttendanceMarker from "./AttendanceMarker";
import LeaveRequest from "./LeaveRequest";
import LeaveStatus from "./LeaveStatus";

const StaffHeader = ({ buttons, defaultComponent }) => {
  const [activeComponent, setActiveComponent] = useState(defaultComponent);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-200 p-4">
        <div>
          <h1 className="text-xl font-bold">Staff Dashboard</h1>
        </div>
        <div className="flex gap-4">
          {buttons.map((button) => (
            <button
              key={button.label}
              className="text-blue-500 hover:underline"
              onClick={() => handleComponentChange(button.component)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeComponent === "AttendanceMarker" && <AttendanceMarker />}
        {activeComponent === "LeaveRequest" && <LeaveRequest />}
        {activeComponent === "LeaveStatus" && <LeaveStatus />}
      </div>
    </>
  );
};

export default StaffHeader;
