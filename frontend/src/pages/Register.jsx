import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../shared/config";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStaffRegister = location.pathname.includes("/register/staff");
  const isSinglePageRegister = !isStaffRegister;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "123456",
    location: "kochi",
    adminKey: "abcd",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    // Perform form validation (e.g., check if passwords match)
    // Make Axios POST request
    try {
      let url;
      if (isStaffRegister) {
        url = "/register/staff";
      } else {
        url = "/register/admin";
        // Check if admin key is valid
        if (formData.adminKey.length !== 4) {
          throw new Error("Admin key must be 4 characters long");
        }
      }
      const response = await axios.post(BASE_URL + url, formData);
      console.log(response.data);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      }
    } catch (error) {
      console.error(
        `Error registering ${isStaffRegister ? "staff" : "admin"}:`,
        error
      );
      setError(error.message || "An error occurred while registering."); // Set error message
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 ">
      <h2 className="md:text-3xl text-xl font-bold">
        {isStaffRegister ? "Staff Register" : "Admin Register"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border border-gray-300 rounded-lg shadow-md p-6"
      >
        <div>
          <label className="block">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
        {isStaffRegister && (
          <div>
            <label className="block">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
          </div>
        )}
        {!isStaffRegister && (
          <div>
            <label className="block">Admin Key:</label>
            <input
              type="password"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              maxLength={4}
              className="border rounded px-2 py-1"
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
