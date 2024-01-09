import { Box, Stack } from "@mui/material";
import { AreaControl, AreaItem } from "components/Area";
import DragDropContainer from "components/DragDropContainer";
import FullScreenLoader from "components/FullScreenLoader";
import ProfileItem from "components/ProfileItem";
import { useGetUserQuery } from "features/api/user/getUser";
import { v4 as uuid } from "uuid";
import React from "react";
import { usePostUserMutation } from "features/api/user/postUser";

export default function Profile() {
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const { data: userData, isLoading: isGettingUserData } =
    useGetUserQuery(null);
  const [postUser] = usePostUserMutation();

  const handleClick = (number: number | undefined) => {
    setControlTop(number);
  };

  const handleDragEnd = (itemIds: string[]) => {
      

    postUser({
      Areas: 
    })
  };

  if (userData && userData.Data)
    return (
      <>
        <ProfileItem editable />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            gap: 1,
          }}
        >
          {userData.Data.Areas && (
            <Stack
              spacing={1}
              sx={{
                flex: "1 1 auto",
                position: "relative",
              }}
            >
              <DragDropContainer
                droppableId={userData.Data.Id || uuid()}
                items={userData.Data.Areas.map((i) => i.Id) || []}
                onDragEnd={handleDragEnd}
              >
                {userData.Data &&
                  userData.Data.Areas &&
                  userData?.Data?.Areas.map((i) => {
                    return <AreaItem id={i.Id} />;
                  })}
              </DragDropContainer>
            </Stack>
          )}
          <Box
            sx={{
              flexShrink: 0,
              width: "var(--ing-width-areaControl)",
              position: "relative",
            }}
          >
            <AreaControl top={controlTop} />
          </Box>
        </Box>
      </>
    );
  return <FullScreenLoader />;
}
