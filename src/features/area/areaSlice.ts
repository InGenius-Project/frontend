import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LayoutArrangement, LayoutType } from "types/DTO/ResumeDTO";

type AreaSliceState = {
  sequence: number;
  title: string;
  type: LayoutType;
  arrangement: LayoutArrangement;
};

const initialState: AreaSliceState = {
  sequence: 0,
  title: "",
  type: LayoutType.CUSTOM,
  arrangement: LayoutArrangement.TEXT,
};

export const areaSlice = createSlice({
  initialState,
  name: "areaSlice",
  reducers: {
    setArrangement: (state, action: PayloadAction<LayoutArrangement>) => {
      state.arrangement = action.payload;
    },
    setType: (state, action: PayloadAction<LayoutType>) => {
      state.type = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export default areaSlice.reducer;

export const { setArrangement, setTitle, setType } = areaSlice.actions;
