import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userNameState,
  userRoleState,
} from "../store/selectors/userDetails";
import { userState } from "../store/atoms/User";

const Header = () => {
  const userName = useRecoilValue(userNameState);
  const userRole = useRecoilValue(userRoleState);
   const setUser = useSetRecoilState(userState);
  const navigate = useNavigate()

  //logout 
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
    <div className="flex justify-between items-center p-5 bg-stone-500">
      <div className="md:p-8 p-6 rounded-full bg-black text-white font-bold ">
        <Link to={"/"}>AMS</Link>
      </div>
      <div className="flex gap-2 items-center">
        {userName ? (
          <>
            <div className="text-white font-semibold">{userName}</div>
            <div className="text-gray-400 font-semibold">{`(${userRole})`}</div>
            <button
              onClick={handleLogout}
              className="font-bold text-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="font-semibold hover:opacity-80">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="font-semibold hover:opacity-80">
              <Link to={"/register"}>Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
