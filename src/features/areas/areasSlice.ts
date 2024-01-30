import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AreaDTO } from "types/DTO/AreaDTO";
import { RootState } from "features/store";
import { v4 as uuid } from "uuid";

export enum AreasType {
  "RESUME" = "RESUME",
  "PROFILE" = "PROFILE",
  "RECRUITMENT" = "RECRUITMENT",
}

type AreasStateType = {
  id: string;
  type?: AreasType;
  areas?: Array<AreaDTO>;
  focusedArea?: AreaDTO;
};

const initialState: AreasStateType = {
  id: uuid(), // TODO: reset uuid
  type: undefined,
  areas: [],
  focusedArea: undefined,
};

const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    setAreas: (
      state,
      action: PayloadAction<
        | {
            id: string;
            type: AreasType;
            areas: Array<AreaDTO>;
          }
        | undefined
      >
    ) => {
      if (action.payload)
        return {
          id: action.payload.id,
          areas: action.payload.areas,
          type: action.payload.type,
          /** when focused Area not exist, which means init fetch
           *  or when type change from fetching area,
           *  cause underneath code to set first area
           */
          focusedArea:
            !state.focusedArea || action.payload.type !== state.type
              ? action.payload.areas[0]
              : state.focusedArea,
        };
      return initialState;
    },
    setFocusedArea: (state, action: PayloadAction<AreaDTO>) => {
      state.focusedArea = action.payload;
    },
  },
});

export const selectIsEmptyAreas = createSelector(
  [(state: RootState) => state.areasState],
  (a) => !!a.areas && a.areas.length === 0
);
export const { setAreas, setFocusedArea } = areasSlice.actions;

export default areasSlice.reducer;
