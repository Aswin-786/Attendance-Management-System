import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userNameState,
  userIdState,
  userRoleState,
} from "../store/selectors/userDetails";
import { userState } from "../store/atoms/User";


const Header = () => {
  const userName = useRecoilValue(userNameState);
  const userRole = useRecoilValue(userRoleState);
  const userId = useRecoilValue(userIdState);

   const setUser = useSetRecoilState(userState);

  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isLoading: false,
      userName: null,
      userId: null,
      role: null,
    });
    navigate('/login')
  };

  return (
    <div className="flex justify-between items-center p-5 bg-gray-400">
      <div>
        <Link to={"/"}>Header</Link>
      </div>
      <div className="flex gap-2">
        {userName ? (
          <>
            <Link to={`/user/${userId}`}>{userName}</Link>
            <span>({userRole})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
