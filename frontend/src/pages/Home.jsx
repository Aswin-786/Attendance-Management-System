import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { useRecoilValue } from "recoil";
import { userRoleState } from "../store/selectors/userDetails";

const Home = () => {
  const userRole = useRecoilValue(userRoleState);

  // Define the routes for different user roles
  const adminDashboardRoute = "/admin/dashboard";
  const staffDashboardRoute = "/staff/dashboard";
  const loginRoute = "/login";

  // Render appropriate component based on user role
  const renderDashboardLink = () => {
    switch (userRole) {
      case "admin":
        return (
          <Link
            className="font-bold text-xl hover:opacity-70 my-3 bg-gray-300 px-4 py-3 rounded-md cursor-pointer"
            to={adminDashboardRoute}
          >
            Dashboard
          </Link>
        );
      case "staff":
        return (
          <Link
            className="font-bold text-xl hover:opacity-70 my-3 bg-gray-300 px-4 py-3 rounded-md cursor-pointer"
            to={staffDashboardRoute}
          >
            Dashboard
          </Link>
        );
      default:
        return <Link className="font-bold text-xl hover:opacity-70 my-3 bg-gray-300 px-4 py-3 rounded-md cursor-pointer" to={loginRoute}>Login</Link>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:py-8 py-5">
      <h1 className="md:text-4xl text-2xl font-bold mb-4">Attendance Management System</h1>
      <p className="text-lg mb-4 py-5">
        Welcome to the Attendance Management System. Please log in to access
        your dashboard.
      </p>
      {renderDashboardLink()}
    </div>
  );
};

export default Home;
