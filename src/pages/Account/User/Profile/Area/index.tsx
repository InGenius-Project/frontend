import { AreaEditModel } from "@/components/Area";
import { useGetAreaByIdQuery } from "@/features/api/area/getArea";
import { usePostAreaMutation } from "@/features/api/area/postArea";
import { useGetUserQuery } from "@/features/api/user/getUser";
import { usePostUserMutation } from "@/features/api/user/postUser";
import {
  getUpdatedArea,
  getUpdatedAreas,
  setLayoutByArea,
} from "@/features/layout/layoutSlice";
import { store, useAppDispatch, useAppSelector } from "@/features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileArea() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { areaId } = useParams();

  const [postArea, { isLoading }] = usePostAreaMutation();
  const [postUser] = usePostUserMutation();
  const { data: userData } = useGetUserQuery(null);
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });

  const areasState = useAppSelector((state) => state.areasState);

  useLayoutEffect(() => {
    if (areaData && areaData.Data) {
      dispatch(setLayoutByArea(areaData.Data));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (userData && userData.Data) {
      let prevAreas = Array.from(userData.Data.Areas || []);

      const existAreaIndex = prevAreas.findIndex(
        (area) => area.Id === areaData?.Data?.Id
      );

      const state = store.getState();
      // Create a new area if not exist
      if (existAreaIndex === -1) {
        // Post full Resume for update the sequence of the areas
        postUser({
          Username: userData.Data.Username,
          Areas: getUpdatedAreas(
            state,
            areasState.focusedArea
              ? areasState.focusedArea.Sequence
              : (userData?.Data?.Areas || []).length
          ),
        })
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      } else {
        postArea(getUpdatedArea(state))
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      }
    }
  };

  return <AreaEditModel onAddClick={handleSubmit} loading={isLoading} />;
}
