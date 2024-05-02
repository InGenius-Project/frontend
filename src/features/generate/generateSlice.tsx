import { AreaGenType, IGenerateAreaByTitlePost, IGenerateAreaPost } from '@/types/interfaces/IArea';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Title = {
  id: string;
  title: string;
};
type GenerateSliceType = {
  prompt: string;
  areaCount: number;
  titles: Title[];
  type: AreaGenType;
  titleOnly: boolean;
};

const initialState: GenerateSliceType = {
  prompt: '',
  areaCount: 8,
  titles: [],
  type: AreaGenType.Resume,
  titleOnly: true,
};

export const generateSlice = createSlice({
  initialState,
  name: 'generateSlice',
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setAreaCount: (state, action) => {
      state.areaCount = action.payload;
    },
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setTitleOnly: (state, action) => {
      state.titleOnly = action.payload;
    },
  },
});

export const selectGenerateTypeLabel = createSelector(
  (state: RootState) => state.generateState,
  (generateSlice) => {
    if (generateSlice.type === AreaGenType.Resume) {
      return '履歷';
    } else {
      return '職缺';
    }
  },
);

export const selectGenerateArea = createSelector(
  (state: RootState) => state.generateState,
  (generateSlice): IGenerateAreaPost => {
    return {
      Title: generateSlice.prompt,
      AreaNum: generateSlice.areaCount,
      Type: generateSlice.type,
      TitleOnly: generateSlice.titleOnly,
    };
  },
);

export const selectGenerateAreaByTitlePost = createSelector(
  (state: RootState) => state.generateState,
  (generateSlice): IGenerateAreaByTitlePost => {
    return {
      Title: generateSlice.prompt,
      Type: generateSlice.type,
      AreaTitles: generateSlice.titles.map((t) => t.title),
    };
  },
);

export default generateSlice.reducer;
export const { setPrompt, setAreaCount, setTitles, setTitleOnly, setType } = generateSlice.actions;
