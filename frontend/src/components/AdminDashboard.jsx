import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '../store/selectors/userDetails';
import AdminHeader from './AdminHeader';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const userRole = useRecoilValue(userRoleState);
 
    useEffect(() => {
      if (!userRole) {
        navigate("/register");
      }
    }, [userRole, navigate]);

    if (userRole !== "admin") {
      navigate("/register");
      return null;
    } 
  return (
    <AdminHeader />
  )
}

export default AdminDashboard