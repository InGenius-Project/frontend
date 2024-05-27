import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserInfo } from '@/types/interfaces/IUser';
import { IToken } from '@/types/interfaces/IToken';
import { apiTags, baseApi } from '../api/baseApi';
import { getResumesApi } from '../api/resume/getResumes';

type userSliceType = {
  User?: IUserInfo;
  Token?: IToken;
};

const initialState: userSliceType = {
  User: undefined,
  Token: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.User = action.payload;
    },
    setToken: (state, action: PayloadAction<IToken>) => {
      state.Token = action.payload;
    },
    logout: () => {
      localStorage.removeItem('accessToken');

      return initialState;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setUserInfo, setToken } = userSlice.actions;
