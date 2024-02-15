import { selector } from "recoil";
import { userState } from "../atoms/User";


export const userNameState = selector({
  key: 'userNameState',
  get: ({ get }) => {
    const state = get(userState);
    return state.userName;
  },
});

export const userIdState = selector({
  key: 'userIdState',
  get: ({ get }) => {
    const state = get(userState)
    return state.userId;
  }
})

export const userRoleState = selector({
  key: 'userRoleState',
  get: ({ get }) => {
    const state = get(userState);
    return state.role;
  }
});