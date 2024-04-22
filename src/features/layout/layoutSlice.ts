import { RootState } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea, IAreaPost, IImageInfo, IInnerKeyValueItem, IKeyValueItem } from '@/types/interfaces/IArea';
import { IInnerTag } from '@/types/interfaces/ITag';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EditorState } from 'lexical';
import { NIL, v4 as uuid } from 'uuid';
import { AreasType } from '../areas/areasSlice';

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
  content?: string;
  image?: IImageInfo;
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
  image: undefined,
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
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setAreaTypeId: (state, action: PayloadAction<number | null>) => {
      state.areaTypeId = action.payload;
    },
    setImage: (state, action: PayloadAction<ILayout['image']>) => {
      state.image = action.payload;
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
          listItems: state.listItems.map((item, i) =>
            i === index
              ? {
                  ...action.payload,
                  InnerId: uuid(),
                }
              : item,
          ),
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
          keyValueListItems: state.keyValueListItems.map((item, i) =>
            i === index
              ? {
                  ...action.payload,
                  InnerId: uuid(),
                }
              : item,
          ),
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
          parseArea.image = {
            Id: action.payload.ImageTextLayout?.Image?.Id || '',
            AltContent: action.payload.ImageTextLayout?.Image?.AltContent || '',
            Uri: action.payload.ImageTextLayout?.Image?.Uri || '',
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
  setTitle,
  setContent,
  setAreaTypeId,
  setLayoutType,
  setListItem,
  pushListItem,
  updateListItem,
  setLayoutByArea,
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
    UserId: areasState.type === AreasType.PROFILE ? areasState.id : undefined,
    RecruitmentId: areasState.type === AreasType.RECRUITMENT ? areasState.id : undefined,
    ResumeId: areasState.type === AreasType.RESUME ? areasState.id : undefined,
    Sequence: newAreaSequence,
    IsDisplayed: true,
    Title: layoutState.title,
    LayoutType: layoutState.layoutType,
    AreaTypeId: layoutState.areaTypeId || undefined,
    TextLayout:
      selectLayoutType(state) === LayoutType.Text
        ? {
            Id: NIL,
            Content: layoutState.content || '',
          }
        : undefined,
    ImageTextLayout:
      selectLayoutType(state) === LayoutType.ImageText
        ? {
            Id: NIL,
            Image: {
              Id: NIL,
              AltContent: JSON.stringify(layoutState.image?.AltContent),
              Uri: layoutState.image?.Uri || '',
            },
            TextContent: layoutState.content || '',
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
  const areasState = state.areasState;
  const updatedArea: IArea = {
    Id: layoutState.areaId || NIL,
    UserId: areasState.type === AreasType.PROFILE ? areasState.id : undefined,
    RecruitmentId: areasState.type === AreasType.RECRUITMENT ? areasState.id : undefined,
    ResumeId: areasState.type === AreasType.RESUME ? areasState.id : undefined,
    Sequence: layoutState.sequence,
    IsDisplayed: layoutState.isDisplayed,
    Title: layoutState.title,
    LayoutType: layoutState.layoutType,
    AreaTypeId: layoutState.areaTypeId || undefined,
    TextLayout:
      selectLayoutType(state) === LayoutType.Text
        ? {
            Id: layoutState.id,
            Content: layoutState.content || '',
          }
        : undefined,
    ImageTextLayout:
      selectLayoutType(state) === LayoutType.ImageText
        ? {
            Id: layoutState.id,
            Image: {
              Id: NIL,
              AltContent: JSON.stringify(layoutState.image?.AltContent),
              Uri: layoutState.image?.Uri || '',
            },
            TextContent: layoutState.content || '',
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
    RecruitmentId: updatedArea.RecruitmentId,
    ResumeId: updatedArea.ResumeId,
    UserId: updatedArea.UserId,
    Sequence: updatedArea.Sequence,
    IsDisplayed: updatedArea.IsDisplayed,
    Title: updatedArea.Title,
    LayoutType: updatedArea.LayoutType,
    AreaTypeId: updatedArea.AreaTypeId,
  };
};

export default layoutSlice.reducer;
