import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { areaApi } from "features/api/area/area";
import { EditorState } from "lexical";
import { AreaDTO, LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";

interface LayoutState {
  type: LayoutType;
  arrangement: LayoutArrangement;
  title: string;
  content?: EditorState | string;
  image?: {
    id: string;
    content: string;
  };
}

const initialState: LayoutState = {
  title: "",
  type: LayoutType.CUSTOM,
  arrangement: LayoutArrangement.TEXT,
  content: undefined,
  image: undefined,
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
    setContent: (state, action: PayloadAction<EditorState>) => {
      state.content = action.payload;
    },
    setLayout: (state, action: PayloadAction<LayoutState>) => {
      state = action.payload;
    },
    setLayoutByArea: (state, action: PayloadAction<AreaDTO>) => {
      var { TextLayout, ImageTextLayout } = action.payload;

      if (TextLayout) {
        return {
          ...state,
          title: TextLayout.Title,
          arrangement: LayoutArrangement.TEXT,
          content: TextLayout.Content,
        };
      }
      if (ImageTextLayout) {
        return {
          ...state,
          title: ImageTextLayout.Title,
          arrangement: LayoutArrangement.TEXT,
          content: ImageTextLayout.Content,
          image: {
            id: ImageTextLayout.Image.Id,
            content: ImageTextLayout.Image.Content,
          },
        };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(areaApi.endpoints.postArea.matchFulfilled, () => {
      return initialState;
    });
  },
});

export const {
  setType,
  setTitle,
  setArrangement,
  setContent,
  setLayout,
  setLayoutByArea,
} = layoutSlice.actions;

export default layoutSlice.reducer;
