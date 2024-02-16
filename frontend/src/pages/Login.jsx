import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@a.com",
    password: "123456",
    role: "admin",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on each form submission

    // Check if a role is selected
    if (!formData.role) {
      setError("Please select a role (admin/staff)");
      return;
    }

    try {
      let url;
      if (formData.role === "admin") {
        url = "/login/admin";
      } else if (formData.role === "staff") {
        url = "/login/staff";
      }
      const response = await axios.post(BASE_URL + url, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser({
          isLoading: false,
          userName: response.data.userName,
          userId: response.data.userId,
          role: response.data.role,
        });
        if (formData.role === "staff") {
          navigate("/staff/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="md:text-3xl text-xl font-bold mb-4 md:py-5 py-4">Login 
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-gray-300 rounded-lg shadow-md p-6"
      >
        <div className="flex flex-col gap-2">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Select Role:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="mr-2"
              />
              Admin
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="staff"
                checked={formData.role === "staff"}
                onChange={handleChange}
                className="mr-2"
              />
              Staff
            </label>
          </div>
        </div>
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

export default Login;
