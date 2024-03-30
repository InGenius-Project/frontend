import { RootState } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea, IAreaPost, IImage, IInnerKeyValueItem, IKeyValueItem } from '@/types/interfaces/IArea';
import { IInnerTag } from '@/types/interfaces/ITag';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EditorState } from 'lexical';
import { NIL, v4 as uuid } from 'uuid';

export enum AreaStep {
  New,
  Layout,
  Edit,
}

interface ILayout {
  areaId?: string;
  sequence: number;
  isDisplayed: boolean;
  id: string;
  layoutType?: LayoutType;
  areaTypeId?: number | null;
  title: string;
  content?: EditorState | string;
  image: IImage;
  listItems?: Array<IInnerTag>;
  keyValueListItems: Array<IInnerKeyValueItem>;
}

const initialState: ILayout = {
  areaId: undefined,
  isDisplayed: true,
  sequence: 0,
  id: '',
  title: '',
  content: undefined,
  image: {
    Id: '',
    Filename: '',
    ContentType: '',
    Content: '',
  },
  listItems: undefined,
  keyValueListItems: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    initializeState: (state) => {
      return initialState;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setLayoutType: (state, action: PayloadAction<LayoutType | undefined>) => {
      state.layoutType = action.payload;
    },
    setContent: (state, action: PayloadAction<EditorState>) => {
      state.content = action.payload;
    },
    setAreaTypeId: (state, action: PayloadAction<number | null>) => {
      state.areaTypeId = action.payload;
    },
    setImage: (state, action: PayloadAction<ILayout['image']>) => {
      state.image = action.payload;
    },
    setImageFilename: (state, action: PayloadAction<string>) => {
      state.image.Filename = action.payload;
    },
    setImageContent: (state, action: PayloadAction<string>) => {
      state.image.Content = action.payload;
    },
    setImageContentType: (state, action: PayloadAction<string>) => {
      state.image.ContentType = action.payload;
    },
    setListItem: (state, action: PayloadAction<Array<IInnerTag>>) => {
      state.listItems = action.payload;
    },
    pushListItem: (state, action: PayloadAction<IInnerTag>) => {
      state.listItems ??= [];

      state.listItems.push(action.payload);
    },
    updateListItem: (state, action: PayloadAction<IInnerTag>) => {
      state.listItems ??= [];

      var index = state.listItems.findIndex((item) => item.InnerId === action.payload.InnerId);

      // Find the empty Items if not exist
      if (index === -1) {
        index = state.listItems?.findIndex((item) => item.InnerId === NIL);
      }

      if (index !== -1) {
        return {
          ...state,
          listItems: state.listItems.map((item, i) => (i === index ? action.payload : item)),
        };
      }
    },
    setKetValueListItems: (state, action: PayloadAction<Array<IInnerKeyValueItem>>) => {
      state.keyValueListItems = action.payload;
    },
    pushKeyValueListItem: (state, action: PayloadAction<IInnerKeyValueItem>) => {
      state.keyValueListItems ??= [];

      state.keyValueListItems.push(action.payload);
    },
    updateKeyValueListItem: (state, action: PayloadAction<IInnerKeyValueItem>) => {
      state.keyValueListItems ??= [];

      var index = state.keyValueListItems.findIndex((item) => item.InnerId === action.payload.InnerId);

      // Find the empty Items if not exist
      if (index === -1) {
        index = state.keyValueListItems?.findIndex((item) => item.InnerId === NIL);
      }

      if (index !== -1) {
        return {
          ...state,
          keyValueListItems: state.keyValueListItems.map((item, i) => (i === index ? action.payload : item)),
        };
      }
    },
    setLayoutByArea: (state, action: PayloadAction<IArea>) => {
      const { Title, AreaTypeId, Sequence, Id, IsDisplayed } = action.payload;

      const layoutType = action.payload.LayoutType;

      // TODO: state init
      var parseArea: ILayout = {
        ...state,
        areaId: Id,
        sequence: Sequence,
        isDisplayed: IsDisplayed,
        title: Title,
        areaTypeId: AreaTypeId,
        layoutType,
      };

      switch (layoutType) {
        case LayoutType.Text:
          parseArea.content = action.payload.TextLayout?.Content;
          parseArea.id = action.payload.TextLayout?.Id!;
          break;
        case LayoutType.ImageText:
          parseArea.id = action.payload.ImageTextLayout?.Id!;
          parseArea.content = action.payload.ImageTextLayout?.Content;
          parseArea.image = {
            Id: action.payload.ImageTextLayout?.Image?.Id || '',
            Filename: action.payload.ImageTextLayout?.Image?.Filename || '',
            ContentType: action.payload.ImageTextLayout?.Image?.ContentType || '',
            Content: action.payload.ImageTextLayout?.Image?.Content || '',
          };
          break;
        case LayoutType.List:
          parseArea.id = action.payload.ListLayout?.Id!;
          parseArea.listItems = action.payload.ListLayout?.Items?.map((i) => ({
            InnerId: uuid(),
            ...i,
          }));
          break;
        case LayoutType.KeyValueList:
          parseArea.id = action.payload.KeyValueListLayout?.Id!;
          parseArea.keyValueListItems =
            action.payload.KeyValueListLayout?.Items?.map((i) => ({
              InnerId: uuid(),
              ...i,
            })) || [];
          break;
      }
      return parseArea;
    },
  },
});

export const {
  initializeState,
  setImageFilename,
  setTitle,
  setContent,
  setAreaTypeId,
  setLayoutType,
  setListItem,
  pushListItem,
  updateListItem,
  setLayoutByArea,
  setImageContent,
  setImageContentType,
  setKetValueListItems,
  pushKeyValueListItem,
  updateKeyValueListItem,
  setImage,
} = layoutSlice.actions;

export const selectLayoutType = (state: RootState) => state.layoutState.layoutType;

export const selectLayoutTitle = (state: RootState) => state.layoutState.title;

export const generateImageBase64Src = (contentType: string, content: string) => `data:${contentType};base64,${content}`;

export const getUpdatedAreas = (state: RootState, newAreaSequence: number) => {
  const areasState = state.areasState;
  const layoutState = state.layoutState;
  var areas = areasState.areas;

  const newArea: IArea = {
    Id: NIL,
    Sequence: newAreaSequence,
    IsDisplayed: true,
    Title: layoutState.title,
    LayoutType: layoutState.layoutType,
    AreaTypeId: layoutState.areaTypeId || undefined,
    TextLayout:
      selectLayoutType(state) === LayoutType.Text
        ? {
            Id: NIL,
            Content: JSON.stringify(layoutState.content),
          }
        : undefined,
    ImageTextLayout:
      selectLayoutType(state) === LayoutType.ImageText
        ? {
            Id: NIL,
            Content: JSON.stringify(layoutState.content),
            Image: {
              Id: NIL,
              Content: layoutState.image?.Content || '',
              ContentType: layoutState.image?.ContentType || 'image/jpeg',
              Filename: layoutState.image?.Filename || '',
            },
          }
        : undefined,
    ListLayout:
      selectLayoutType(state) === LayoutType.List
        ? {
            Id: NIL,
            Items: layoutState.listItems?.filter((l) => l.Name !== ''),
          }
        : undefined,
    KeyValueListLayout:
      selectLayoutType(state) === LayoutType.KeyValueList
        ? {
            Id: NIL,
            Items: layoutState.keyValueListItems
              .filter((l) => !!l.Key && l.Value !== '')
              .map(({ InnerId, ...i }) => i) as IKeyValueItem[],
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

export const getUpdatedArea = (state: RootState) => {
  const layoutState = state.layoutState;
  const updatedArea: IArea = {
    Id: layoutState.areaId || NIL,
    Sequence: layoutState.sequence,
    IsDisplayed: layoutState.isDisplayed,
    Title: layoutState.title,
    LayoutType: layoutState.layoutType,
    AreaTypeId: layoutState.areaTypeId || undefined,
    TextLayout:
      selectLayoutType(state) === LayoutType.Text
        ? {
            Id: layoutState.id,
            Content: JSON.stringify(layoutState.content),
          }
        : undefined,
    ImageTextLayout:
      selectLayoutType(state) === LayoutType.ImageText
        ? {
            Id: layoutState.id,
            Content: JSON.stringify(layoutState.content),
            Image: {
              Id: layoutState.image.Id,
              Content: layoutState.image?.Content || '',
              ContentType: layoutState.image?.ContentType || 'image/jpeg',
              Filename: layoutState.image?.Filename || '',
            },
          }
        : undefined,
    ListLayout:
      selectLayoutType(state) === LayoutType.List
        ? {
            Id: layoutState.id,
            // sort item
            Items: layoutState.listItems?.filter((l) => l.Name !== ''),
          }
        : undefined,
    KeyValueListLayout:
      selectLayoutType(state) === LayoutType.KeyValueList
        ? {
            Id: layoutState.id,
            Items: layoutState.keyValueListItems
              .filter((l) => !!l.Key && l.Value !== '')
              .map(({ InnerId, ...i }) => i) as IKeyValueItem[],
          }
        : undefined,
  };

  return updatedArea;
};

export const getUpdateAreaPost = (state: RootState): IAreaPost => {
  const updatedArea = getUpdatedArea(state);
  return {
    Id: updatedArea.Id,
    Sequence: updatedArea.Sequence,
    IsDisplayed: updatedArea.IsDisplayed,
    Title: updatedArea.Title,
    LayoutType: updatedArea.LayoutType,
    AreaTypeId: updatedArea.AreaTypeId,
  };
};

export default layoutSlice.reducer;
