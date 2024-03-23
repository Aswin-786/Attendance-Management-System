import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CgProfile } from "react-icons/cg";
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

  const [card,setCard] = useState(false);

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
    <div className="flex justify-between items-center p-5 bg-white">
      <div className=" ">
        <Link to={"/"}>
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1803636316.1708128000&semt=sph"
            alt="logo"
            className="w-10 h-10"
          />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {userName ? (
          <>
            <div onClick={() => setCard(!card)}>
              <CgProfile />
            </div>
            {card && (
              <>
                <div className="text-black font-semibold">{userName[0]}</div>
                <div className="text-gray-400 font-semibold">{`(${userRole})`}</div>
                <button
                  onClick={handleLogout}
                  className="font-bold text-gray-300"
                >
                  Logout
                </button>
              </>
            )}
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
