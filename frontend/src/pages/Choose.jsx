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
    <div className="flex flex-col items-center justify-center min-h-full">
      <h2>Choose Your Role</h2>
      <select onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
    </div>
  );
};

export default Choose;
