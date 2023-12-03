import { Box, Stack, Typography } from "@mui/material";
import { AreaControl, AreaItem } from "components/Area";
import { ResumeItem } from "components/Resume";
import { useGetResumeByIdQuery } from "features/api/resume/resume";
import { setType } from "features/area/areaSlice";
import { useAppDispatch } from "features/store";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LayoutType } from "types/DTO/ResumeDTO";

export default function ResumeEdit() {
  const { resumeId = "" } = useParams();
  const { data: res } = useGetResumeByIdQuery(resumeId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);

  const handleClick = (number: number | undefined) => {
    setControlTop(number);
  };

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (res?.Data) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          title={res.Data.Title}
          id={res.Data.Id}
          modifiedAt={new Date(res.Data.ModifiedAt)}
        ></ResumeItem>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            gap: 1,
          }}
        >
          <Stack
            spacing={1}
            sx={{
              flex: "1 1 auto",
              position: "relative",
            }}
          >
            {res?.Data?.TextLayouts &&
              res.Data.TextLayouts.map((t) => (
                <AreaItem
                  title={t.Layout.Title}
                  onClick={handleClick}
                  key={t.Layout.Id}
                >
                  <Typography variant="body1">{t.Layout.Content}</Typography>
                </AreaItem>
              ))}
          </Stack>

          <Box
            sx={{
              flexShrink: 0,
              width: "var(--ing-width-areaControl)",
              position: "relative",
            }}
          >
            <AreaControl top={controlTop} onAddClick={handleAddClick} />
          </Box>
        </Box>
      </Stack>
    );
  } else {
    return null;
  }
}
