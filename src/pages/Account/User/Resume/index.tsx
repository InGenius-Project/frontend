import { Box, CssBaseline, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetResumesQuery,
  usePostResumeMutation,
} from "features/api/resume/resume";
import { ResumeItem } from "components/Resume";
import { useAppSelector } from "features/store";
import LoadingButton from "@mui/lab/LoadingButton";
import FullScreenLoader from "components/FullScreenLoader";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const [
    postResume,
    {
      data: resData,
      isLoading: isAddingNewResume,
      isSuccess: isSuccessAddingNewResume,
    },
  ] = usePostResumeMutation();
  const userStae = useAppSelector((state) => state.userState);
  const { data: resumes, isLoading } = useGetResumesQuery(null);
  const navigate = useNavigate();

  const handelAddNewResumeClick = () => {
    postResume({
      Title: `${userStae.User?.Username}的履歷`,
    })
      .unwrap()
      .then((res) => {
        if (res && res.Data) {
          navigate(`Edit/${res.Data.Id}`);
        }
      });
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <LoadingButton
          variant="text"
          loading={isAddingNewResume}
          startIcon={<AddIcon />}
          onClick={handelAddNewResumeClick}
        >
          新增履歷
        </LoadingButton>
      </Box>
      <CssBaseline />

      <Stack spacing={1}>
        {resumes &&
          resumes.Data &&
          resumes.Data.length > 0 &&
          resumes.Data.map((r) => (
            <ResumeItem
              title={r.Title}
              key={r.Id}
              id={r.Id}
              modifiedAt={r.ModifiedAt}
            />
          ))}
      </Stack>
    </Stack>
  );
}