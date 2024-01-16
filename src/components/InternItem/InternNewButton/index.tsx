import React from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonBase, Stack, styled } from "@mui/material";
import InternItem from "..";

const InternItemBase = styled(ButtonBase)(({ theme }) => ({
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

const InternNewButton: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // navigate("./New");
  };

  return (
    <Stack spacing={1}>
      <InternItemBase onClick={handleButtonClick}>
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
      </InternItemBase>
      <InternItem></InternItem>
    </Stack>
  );
};

export default InternNewButton;
