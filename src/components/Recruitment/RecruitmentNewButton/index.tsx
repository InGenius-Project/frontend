import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Box, ButtonBase, styled } from "@mui/material";
import { usePostRecruitmentMutation } from "@/features/api/recruitment/postRecruitment";
import { NIL } from "uuid";
import React from "react";
import { useAppSelector } from "@/features/store";
import { useNavigate } from "react-router-dom";

const RecruitmentNewButtonBase = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lighter,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.shape.borderRadius,
}));

const RecruitmentNewButton: React.FC = () => {
  const [postRecruitment] = usePostRecruitmentMutation();
  const userState = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    postRecruitment({
      Id: NIL,
      Name: `${userState.User?.Username}的職缺`,
      Enable: false,
      Areas: [],
    })
      .unwrap()
      .then((r) => {
        r && r.Data && navigate(`Edit/${r.Data.Id}`);
      });
  };

  return (
    <RecruitmentNewButtonBase onClick={handleButtonClick}>
      <Box
        sx={{
          borderRadius: "50%",
          backgroundColor: "white",
          padding: 1,
        }}
      >
        <CreateOutlinedIcon />
      </Box>
      新增職缺
    </RecruitmentNewButtonBase>
  );
};

export default RecruitmentNewButton;
