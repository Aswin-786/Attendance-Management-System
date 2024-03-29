import { atom } from "recoil";


export const userState = atom({
  key: "userState",
  default: {
    isLoading: true,
    userName: null,
    userId: null,
    role: null, 
  },
});
