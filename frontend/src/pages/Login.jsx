import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/User";

const Login = () => {
  const setUser = useSetRecoilState(userState);

  const [formData, setFormData] = useState({
    email: "t@t.com",
    password: "123456",
    role: "admin", 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if a role is selected
    if (!formData.role) {
      alert("Please select a role (admin/staff)");
      return;
    }

    try {
      let url;
      if (formData.role === "admin") {
        url = "/login/admin";
      } else if (formData.role === "staff") {
        url = "/login/staff";
      }
      const response = await axios.post(BASE_URL+url, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
         if (response.status === 200) {
           localStorage.setItem("token", response.data.token);
           if (formData.role === "staff") {
             setUser({
               isLoading: false,
               userName: response.data.userName,
               userId: response.data.userId,
               role: response.data.role,
             });
             navigate("/staff/dashboard");
           } else {
             setUser({
               isLoading: false,
               userName: response.data.userName,
               userId: response.data.userId,
               role: response.data.role,
             });
             navigate("/admin/dashboard");
           }
         }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold mb-4">Login Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>email:</label>
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
