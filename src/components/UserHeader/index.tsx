import React from "react";
import { Stack, Breadcrumbs, Checkbox, Link, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

type UserHeaderProps = {
  toggle: boolean;
  onToggle: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void | undefined;
};

export default function UserHeader({ toggle, onToggle }: UserHeaderProps) {
  React.useEffect(() => {
    console.log("header", toggle);
  }, [toggle]);

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        p: 1,
      }}
    >
      <Checkbox
        checked={toggle}
        icon={<KeyboardDoubleArrowRightIcon />}
        checkedIcon={<KeyboardDoubleArrowLeftIcon />}
        onChange={onToggle}
        sx={{
          display: toggle ? "none" : "box",
          marginRight: 1,
        }}
      />
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </Stack>
  );
}
