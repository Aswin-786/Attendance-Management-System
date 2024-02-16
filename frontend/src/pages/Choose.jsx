import React from "react";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "admin") {
      navigate("/register/admin");
    } else if (selectedOption === "staff") {
      navigate("/register/staff");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full md:py-5 py-3">
      <h2 className="md:text-3xl text-xl font-bold mb-4">Choose Your Role</h2>
      <select
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
    </div>
  );
};

export default Choose;
