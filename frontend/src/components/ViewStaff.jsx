import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../shared/config";

const ViewStaff = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/dashboard/admin/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, [userId]); // Fetch user data when userId prop changes

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : userData ? (
        <div>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Location:</strong> {userData.location}
          </p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewStaff;
