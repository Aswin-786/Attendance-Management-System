import React, { useState } from "react";
import StaffList from "./StaffLitst";
import AdminLeaveStatus from "./AdminLeaveStatus";

const AdminHeader = () => {
  const [activeComponent, setActiveComponent] = useState("Staff List");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-300 p-4">
        <div>
          <h1 className="md:text-xl text-lg font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <button
            className={`text-blue-500 hover:underline hover:opacity-70 ${
              activeComponent === "Staff List" && "font-bold"
            }`}
            onClick={() => handleComponentChange("Staff List")}
          >
            Staff List
          </button>
          <button
            className={`text-blue-500 hover:underline hover:opacity-70 ${
              activeComponent === "LeaveStatus" && "font-bold"
            }`}
            onClick={() => handleComponentChange("LeaveStatus")}
          >
            Leave Request
          </button>
        </div>
      </div>
      <div>
        {activeComponent === "Staff List" && <StaffList />}
        {activeComponent === "LeaveStatus" && <AdminLeaveStatus />}
      </div>
    </>
  );
};

export default AdminHeader;
