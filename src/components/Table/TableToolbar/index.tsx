import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";
import { Box } from "@mui/material";

interface EnhancedTableToolbarProps {
  title?: string;
  numSelected: number;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps & React.PropsWithChildren
) {
  const { numSelected, title = "", children, onDelete } = props;

  return (
    <Box>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            已選擇 {numSelected} 項
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              {/* TODO: fileter */}
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
}
