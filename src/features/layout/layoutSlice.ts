import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resumeAreaApi } from "features/api/resume/resumeArea";
import {
  ImageTextLayoutDTO,
  LayoutArrangement,
  LayoutType,
  TextLayoutDTO,
} from "types/DTO/AreaDTO";

interface LayoutState {
  type: LayoutType;
  arrangement: LayoutArrangement;
  title: string;
  textLayout: TextLayoutDTO | null;
  imageTextLayout: ImageTextLayoutDTO | null;
}

const initialState: LayoutState = {
  title: "",
  type: LayoutType.CUSTOM,
  arrangement: LayoutArrangement.TEXT,
  textLayout: null,
  imageTextLayout: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<LayoutType>) => {
      state.type = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setArrangement: (state, action: PayloadAction<LayoutArrangement>) => {
      state.arrangement = action.payload;
    },
    setTextLayout: (state, action: PayloadAction<TextLayoutDTO>) => {
      return {
        ...state,
        type: action.payload.Type,
        title: action.payload.Title,
        arrangement: LayoutArrangement.TEXT,
        textLayout: action.payload,
      };
    },
    setTextLayoutContent: (state, action: PayloadAction<string>) => {
      state.textLayout && (state.textLayout.Content = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      resumeAreaApi.endpoints.postResumeArea.matchFulfilled,
      () => {
        console.log("set");
        return initialState;
      }
    );
  },
});

export const {
  setType,
  setTitle,
  setTextLayout,
  setTextLayoutContent,
  setArrangement,
} = layoutSlice.actions;

export default layoutSlice.reducer;
