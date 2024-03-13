import { AreaEditModel } from '@/components/Area';
import { useGetAreaByIdQuery } from '@/features/api/area/getArea';
import { usePostAreaMutation } from '@/features/api/area/postArea';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { usePostUserMutation } from '@/features/api/user/postUser';
import { getUpdatedArea, getUpdatedAreas, setLayoutByArea } from '@/features/layout/layoutSlice';
import { store, useAppDispatch, useAppSelector } from '@/features/store';
import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProfileArea() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);

  const { areaId } = useParams();

  const [postArea, { isLoading }] = usePostAreaMutation();
  const [postUser] = usePostUserMutation();
  const { data: userData } = useGetUserQuery(null);
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });

  useLayoutEffect(() => {
    if (areaData && areaData.result) {
      dispatch(setLayoutByArea(areaData.result));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (userData && userData.result) {
      let prevAreas = Array.from(userData.result.Areas || []);

      const existAreaIndex = prevAreas.findIndex((area) => area.Id === areaData?.result?.Id);

      const state = store.getState();
      // Create a new area if not exist
      if (existAreaIndex === -1) {
        // Post full Resume for update the sequence of the areas
        postUser({
          Username: userData.result.Username,
          Areas: getUpdatedAreas(state, layoutState.sequence),
        })
          .unwrap()
          .then(() => {
            navigate('..');
            return;
          });
      } else {
        postArea(getUpdatedArea(state))
          .unwrap()
          .then(() => {
            navigate('..');
            return;
          });
      }
    }
  };

  return <AreaEditModel onAddClick={handleSubmit} loading={isLoading} />;
}
