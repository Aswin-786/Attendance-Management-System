import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { userState } from "../store/atoms/User";
import { BASE_URL } from "../shared/config";

const InitUser = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (res.status === 200) {
          const { role } = res.data.info;
          if (role === "admin") {
            setUser({
              isLoading: false,
              userName: res.data.info.adminName,
              userId: res.data.info.adminId,
              role: role,
            });
          } else if (role === "staff") {
            setUser({
              isLoading: false,
              userName: res.data.info.staffName,
              userId: res.data.info.staffId,
              role: role,
            });
          } else {
            setUser({
              isLoading: false,
              userName: null,
              userId: null,
              role: null,
            });
          }

          localStorage.setItem("token", res.data.token);
        }
      } catch (error) {
        setUser({
          isLoading: false,
          userName: null,
          userId: null,
          role: null,
        });
      }
    };

    checkProfile();
  }, [setUser]);

  return <></>;
};

export default InitUser;
