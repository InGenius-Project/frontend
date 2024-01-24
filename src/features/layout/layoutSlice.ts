import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/store";
import { EditorState } from "lexical";
import { AreaDTO, LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";

interface LayoutState {
  type: LayoutType;
  arrangement: LayoutArrangement;
  title: string;
  content?: EditorState | string;
  image: {
    id: string;
    filename: string;
    contentType: string;
    content: string;
  };
  listItems?: Array<Tag>;
  keyValueListItems: Array<KeyValueListItem>;
}

export interface Tag {
  id: string;
  name: string;
  type: string;
}

export interface KeyValueListItem {
  id: string;
  key: Tag;
  value: string;
}

const initialState: LayoutState = {
  title: "",
  type: LayoutType.CUSTOM,
  arrangement: LayoutArrangement.TEXT,
  content: undefined,
  image: {
    id: "",
    filename: "",
    contentType: "",
    content: "",
  },
  listItems: undefined,
  keyValueListItems: [],
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    initializeState: (state) => {
      return initialState;
    },
    initializeStateWithoutFocusedArea: (state) => {
      return {
        ...initialState,
      };
    },
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
    setImage: (state, action: PayloadAction<LayoutState["image"]>) => {
      state.image = action.payload;
    },
    setImageFilename: (state, action: PayloadAction<string>) => {
      state.image.filename = action.payload;
    },
    setImageContent: (state, action: PayloadAction<string>) => {
      state.image.content = action.payload;
    },
    setListItem: (state, action: PayloadAction<Array<Tag>>) => {
      state.listItems = action.payload;
    },
    setKetValueListItems: (
      state,
      action: PayloadAction<Array<KeyValueListItem>>
    ) => {
      state.keyValueListItems = action.payload;
    },
    setLayoutByArea: (state, action: PayloadAction<AreaDTO>) => {
      const { Title, Type, Arrangement } = action.payload;

      var parseArea = {
        ...state,
        title: Title,
        type: Type,
        arrangement: Arrangement,
      };

      switch (Arrangement) {
        case LayoutArrangement.TEXT:
          parseArea.content = action.payload.TextLayout?.Content;
          break;
        case LayoutArrangement.IMAGETEXT:
          parseArea.content = action.payload.ImageTextLayout?.Content;
          parseArea.image = {
            id: action.payload.ImageTextLayout?.Image?.Id!,
            filename: action.payload.ImageTextLayout?.Image?.Filename!,
            contentType: action.payload.ImageTextLayout?.Image?.ContentType!,
            content: action.payload.ImageTextLayout?.Image?.Content!,
          };
          break;
        case LayoutArrangement.LIST:
          parseArea.listItems = action.payload.ListLayout!.Items!.map((i) => ({
            id: i.Id,
            name: i.Name,
            type: "CUSTOM",
          }));
          break;
      }
      return parseArea;
    },
  },
});

export const {
  initializeState,
  initializeStateWithoutFocusedArea,
  setType,
  setImageFilename,
  setTitle,
  setArrangement,
  setContent,
  setLayout,
  setListItem,
  setLayoutByArea,
  setImageContent,
  setKetValueListItems,
  setImage,
} = layoutSlice.actions;

export const getImageBase64Src = createSelector(
  (state: RootState) => state.layoutState.image.contentType,
  (state: RootState) => state.layoutState.image.content,
  (contentType, content) => `data:${contentType};base64,${content}`
);

export default layoutSlice.reducer;
