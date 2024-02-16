import React from 'react'
import { useRecoilValue } from 'recoil';
import { userRoleState } from '../store/selectors/userDetails';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
   const userRole = useRecoilValue(userRoleState);
   if (userRole !== "admin") {
    navigate("/register");
    return null;
   } 
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard