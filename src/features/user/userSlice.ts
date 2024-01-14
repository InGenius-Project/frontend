import { TokenDTO } from "./../../types/DTO/TokenDTO";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { getResumeByIdApi } from "features/api/resume/getResumeById";
import { UserDTO, UserInfoDTO } from "types/DTO/UserDTO";

type userSliceType = {
  User?: UserInfoDTO;
  Token?: TokenDTO;
};

const initialState: userSliceType = {
  User: undefined,
  Token: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfoDTO>) => {
      state.User = action.payload;
    },

    setToken: (state, action: PayloadAction<TokenDTO>) => {
      state.Token = action.payload;
    },
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setUserInfo, setToken } = userSlice.actions;
