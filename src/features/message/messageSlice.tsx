import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { chatUrl } from '@/assets/utils/urls';
import { start } from 'repl';
import { IChatGroup } from '@/types/interfaces/IChat';

type MessageStateType = {
  groupId?: string;
  conn: HubConnection;
  chatGroup?: IChatGroup;
};

const initialState: MessageStateType = {
  groupId: undefined,
  conn: new HubConnectionBuilder()
    .withUrl(chatUrl, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => localStorage.getItem('accessToken') || '',
    })
    .build(),
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setGroupId(state, action: PayloadAction<string>) {
      state.groupId = action.payload;
    },
    setChatGroup(state, action: PayloadAction<IChatGroup>) {
      state.chatGroup = action.payload;
    },
  },
});

export const selectGroupId = createSelector(
  (state: RootState) => state.messageState.groupId,
  (groupId) => groupId,
);

export const selectConn = createSelector(
  (state: RootState) => state.messageState.conn,
  (conn) => conn,
);

export const { setGroupId } = messageSlice.actions;

export default messageSlice.reducer;
