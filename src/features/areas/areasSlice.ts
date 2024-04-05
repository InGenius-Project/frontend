import { RootState } from '@/features/store';
import { IArea, IAreaPost, IAreaSequencePost } from '@/types/interfaces/IArea';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export enum AreasType {
  'RESUME' = 'RESUME',
  'PROFILE' = 'PROFILE',
  'RECRUITMENT' = 'RECRUITMENT',
}

type AreasStateType = {
  id: string;
  type?: AreasType;
  areas?: Array<IArea>;
};

const initialState: AreasStateType = {
  id: uuid(), // TODO: reset uuid
  type: undefined,
  areas: [],
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    setAreas: (
      state,
      action: PayloadAction<
        | {
            id: string;
            type: AreasType;
            areas: Array<IArea>;
          }
        | undefined
      >,
    ) => {
      if (action.payload)
        return {
          id: action.payload.id,
          areas: action.payload.areas,
          type: action.payload.type,
        };
      return initialState;
    },
    pushArea: (state, action: PayloadAction<IArea>) => {
      return {
        ...state,
        areas: state.areas?.concat(action.payload),
      };
    },
    setAreasId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setAreasSequence: (state, action: PayloadAction<Array<IAreaSequencePost>>) => {
      action.payload.forEach((areaSequencePost) => {
        const area = state.areas?.find((area) => area.Id === areaSequencePost.Id);
        if (area) {
          area.Sequence = areaSequencePost.Sequence;
        }
      });
      state.areas = state.areas?.sort((a, b) => a.Sequence - b.Sequence);
    },
  },
});

export const selectIsEmptyAreas = createSelector(
  [(state: RootState) => state.areasState],
  (a) => !!a.areas && a.areas.length === 0,
);

export const { setAreas, setAreasId, setAreasSequence } = areasSlice.actions;

export default areasSlice.reducer;
