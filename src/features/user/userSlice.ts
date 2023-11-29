import { TokenDTO } from "./../../types/DTO/TokenDTO";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "os";
import { UserDTO, UserInfoDTO } from "types/DTO/UserDTO";

const initialState: UserDTO = {
  user: undefined,
  token: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfoDTO>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<TokenDTO>) => {
      state.token = action.payload;
    },
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setUserInfo, setToken } = userSlice.actions;
