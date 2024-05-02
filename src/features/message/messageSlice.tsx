import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type MessageStateType = {
  groupId?: string;
};

const initialState: MessageStateType = {
  groupId: undefined,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setGroupId(state, action) {
      state.groupId = action.payload;
    },
  },
});

export const selectGroupId = createSelector(
  (state: RootState) => state.messageState.groupId,
  (groupId) => groupId,
);

export const { setGroupId } = messageSlice.actions;

export default messageSlice.reducer;
