import { Box, Stack } from "@mui/material";
import AreaEditor from "components/Area/AreaEditor";
import ProfileItem from "components/ProfileItem";
import { useGetUserQuery } from "features/api/user/getUser";
import { usePostUserMutation } from "features/api/user/postUser";
import { AreasType, setAreas } from "features/areas/areasSlice";
import { useAppDispatch } from "features/store";
import { useEffect } from "react";
import { AreaDTO } from "types/DTO/AreaDTO";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserQuery(null, {});

  useEffect(() => {
    if (userData && userData.Data) {
      dispatch(
        setAreas({
          id: userData.Data?.Id,
          type: AreasType.PROFILE,
          areas: userData?.Data?.Areas || [],
        })
      );
    }
  }, [dispatch, userData]);

  const [postUser] = usePostUserMutation();

  const handlePostProfileArea = async (areas: Array<AreaDTO>) => {
    await postUser({
      Username: userData?.Data?.Username || "",
      Areas: areas,
    });
  };

  return (
    <Stack spacing={1}>
      <ProfileItem editable />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexGrow: 1,
          gap: 1,
        }}
      >
        <AreaEditor onPost={handlePostProfileArea}></AreaEditor>
      </Box>
    </Stack>
  );
}
