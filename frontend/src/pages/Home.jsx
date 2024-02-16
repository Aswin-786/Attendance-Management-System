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
  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <Link to={adminDashboardRoute} >Dashboard</Link>;
      case "staff":
        return <Link to={staffDashboardRoute}>Dashboard</Link>;
      default:
        return <Link to={loginRoute}>Dashboard</Link>;
    }
  };

  return <>{renderDashboard()}</>;
};

export default Home;
