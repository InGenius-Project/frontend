import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "features/store";
import { EditorState } from "lexical";
import { parse } from "path";
import { AreaDTO, LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";
import { NIL } from "uuid";

interface Image {
  id: string;
  filename: string;
  contentType: string;
  content: string;
}

interface Layout {
  areaId: string;
  sequence: number;
  isDisplayed: boolean;
  id: string;
  type: LayoutType;
  arrangement: LayoutArrangement;
  title: string;
  content?: EditorState | string;
  image: Image;
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

const initialState: Layout = {
  areaId: "",
  isDisplayed: true,
  sequence: 0,
  id: "",
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
    setLayout: (state, action: PayloadAction<Layout>) => {
      state = action.payload;
    },
    setImage: (state, action: PayloadAction<Layout["image"]>) => {
      state.image = action.payload;
    },
    setImageFilename: (state, action: PayloadAction<string>) => {
      state.image.filename = action.payload;
    },
    setImageContent: (state, action: PayloadAction<string>) => {
      state.image.content = action.payload;
    },
    setImageContentType: (state, action: PayloadAction<string>) => {
      state.image.contentType = action.payload;
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
      const { Title, Type, Arrangement, Sequence, Id, IsDisplayed } =
        action.payload;

      var parseArea: Layout = {
        ...state,
        areaId: Id,
        sequence: Sequence,
        isDisplayed: IsDisplayed,
        title: Title,
        type: Type,
        arrangement: Arrangement,
      };

      switch (Arrangement) {
        case LayoutArrangement.TEXT:
          parseArea.content = action.payload.TextLayout?.Content;
          parseArea.id = action.payload.TextLayout?.Id!;
          break;
        case LayoutArrangement.IMAGETEXT:
          parseArea.id = action.payload.ImageTextLayout?.Id!;
          parseArea.content = action.payload.ImageTextLayout?.Content;
          parseArea.image = {
            id: action.payload.ImageTextLayout?.Image?.Id!,
            filename: action.payload.ImageTextLayout?.Image?.Filename!,
            contentType: action.payload.ImageTextLayout?.Image?.ContentType!,
            content: action.payload.ImageTextLayout?.Image?.Content!,
          };
          break;
        case LayoutArrangement.LIST:
          parseArea.id = action.payload.ListLayout?.Id!;
          parseArea.listItems = action.payload.ListLayout!.Items!.map((i) => ({
            id: i.Id,
            name: i.Name,
            type: "CUSTOM",
          }));
          break;
        case LayoutArrangement.KEYVALUELIST:
          parseArea.id = action.payload.KeyValueListLayout?.Id!;
          parseArea.keyValueListItems =
            action.payload.KeyValueListLayout!.Items!.map((i) => ({
              id: i.Id,
              key: {
                id: i.Key.Id,
                name: i.Key.Name,
                type: "CUSTOM",
              },
              value: i.Value,
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
  setImageContentType,
  setKetValueListItems,
  setImage,
} = layoutSlice.actions;

// TODO: remove createSelector
export const generateImageBase64Src = (contentType: string, content: string) =>
  `data:${contentType};base64,${content}`;

export const getUpdatedAreas = (newAreaSequence: number) => {
  const state = store.getState();
  const areasState = state.areasState;
  const layoutState = state.layoutState;
  var areas = areasState.areas;

  const newArea: AreaDTO = {
    Id: NIL,
    Sequence: newAreaSequence,
    Type: layoutState.type,
    IsDisplayed: true,
    Title: layoutState.title,
    Arrangement: layoutState.arrangement,
    TextLayout:
      layoutState.arrangement === LayoutArrangement.TEXT
        ? {
            Id: NIL,
            Content: JSON.stringify(layoutState.content),
          }
        : undefined,
    ImageTextLayout:
      layoutState.arrangement === LayoutArrangement.IMAGETEXT
        ? {
            Id: NIL,
            Content: JSON.stringify(layoutState.content),
            Image: {
              Id: NIL,
              Content: layoutState.image?.content || "",
              ContentType: layoutState.image?.contentType || "image/jpeg",
              Filename: layoutState.image?.filename || "",
            },
          }
        : undefined,
    ListLayout:
      layoutState.arrangement === LayoutArrangement.LIST
        ? {
            Id: NIL,
            Items: (layoutState.listItems || []).map((i) => ({
              Id: NIL,
              Name: i.name,
              Type: "CUSTOM", // TODO: Base on area type
            })),
          }
        : undefined,
    KeyValueListLayout:
      layoutState.arrangement === LayoutArrangement.KEYVALUELIST
        ? {
            Id: NIL,
            Items: (layoutState.keyValueListItems || []).map((i) => ({
              Id: NIL,
              Key: {
                Id: NIL,
                Name: i.key.name,
                Type: "CUSTOM",
              },
              Value: i.value,
            })),
          }
        : undefined,
  };

  areas = areas ? [...areas] : [];

  areas.splice(newAreaSequence + 1, 0, newArea);

  const updatedAreas = areas.map((area, i) => ({
    ...area,
    Sequence: i,
  }));

  return updatedAreas;
};

export const getUpdatedArea = () => {
  const layoutState = store.getState().layoutState;
  const updatedArea: AreaDTO = {
    Id: layoutState.areaId,
    Sequence: layoutState.sequence,
    IsDisplayed: layoutState.isDisplayed,
    Title: layoutState.title,
    Arrangement: layoutState.arrangement,
    Type: layoutState.type,
    TextLayout:
      layoutState.arrangement === LayoutArrangement.TEXT
        ? {
            Id: layoutState.id,
            Content: JSON.stringify(layoutState.content),
          }
        : undefined,
    ImageTextLayout:
      layoutState.arrangement === LayoutArrangement.IMAGETEXT
        ? {
            Id: layoutState.id,
            Content: JSON.stringify(layoutState.content),
            Image: {
              Id: layoutState.image.id,
              Content: layoutState.image?.content || "",
              ContentType: layoutState.image?.contentType || "image/jpeg",
              Filename: layoutState.image?.filename || "",
            },
          }
        : undefined,
    ListLayout:
      layoutState.arrangement === LayoutArrangement.LIST
        ? {
            Id: layoutState.id,
            // sort item
            Items: (layoutState.listItems || []).map((i) => ({
              Id: NIL,
              Name: i.name,
              Type: "CUSTOM", // TODO: Base on area type
            })),
          }
        : undefined,
    KeyValueListLayout:
      layoutState.arrangement === LayoutArrangement.KEYVALUELIST
        ? {
            Id: layoutState.id,
            Items: (layoutState.keyValueListItems || []).map((i) => ({
              Id: NIL,
              Key: {
                Id: NIL,
                Name: i.key.name,
                Type: "CUSTOM",
              },
              Value: i.value,
            })),
          }
        : undefined,
  };

  return updatedArea;
};

export default layoutSlice.reducer;
