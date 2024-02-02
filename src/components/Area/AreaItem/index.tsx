import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { AreaDTO, LayoutArrangement } from "types/DTO/AreaDTO";
import RichTextEditor from "components/RichTextEditor";
import AreaListItem from "../AreaListItem";
import AreaKeyValueListItem from "../AreaKeyValueListItem";
import layoutSlice from "features/layout/layoutSlice";

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  id: string;
  area: AreaDTO;
  focused?: boolean;
} & Partial<DraggableProvidedDragHandleProps>;

const AreaItem = ({
  onClick,
  area,
  children,
  focused,
  ...props
}: PropsWithChildren<AreaItemProps>) => {
  const [isHover, setIsHover] = React.useState(false);
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [focusedState, setFocusState] = useState(false);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    onClick && onClick(ref.current as HTMLElement);
  };

  useEffect(() => {
    setFocusState(focused ? focused : false);
  }, [focused]);

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: "relative",
        "&::before": focusedState
          ? {
              content: '""',
              height: "100%",
              position: "absolute",
              borderRadius: 4,
              left: 0,
              top: 0,
              backgroundColor: theme.palette.primary.main,
              width: 5,
            }
          : undefined,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick()}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          justifyContent: "center",
          cursor: "move",
          display: isHover ? "flex" : "none",
        }}
        {...props}
      >
        <DragHandleIcon color="primary" />
      </Box>
      <Stack spacing={1}>
        <Typography variant="h4">{area.Title ? area.Title : "標題"}</Typography>
        {area.Arrangement === LayoutArrangement.IMAGETEXT &&
          area.ImageTextLayout?.Image?.Content && (
            <Stack direction={"row"} spacing={1}>
              <img
                src={`data:${area.ImageTextLayout?.Image?.ContentType};base64,${area.ImageTextLayout?.Image?.Content}`}
                alt={area.ImageTextLayout.Image.Filename}
                style={{
                  width: "15vw",
                  height: "15vw",
                }}
              />
              <RichTextEditor
                controllable={false}
                initialEditorState={area.ImageTextLayout?.Content}
              ></RichTextEditor>
            </Stack>
          )}

        {area.Arrangement === LayoutArrangement.TEXT && (
          <RichTextEditor
            controllable={false}
            initialEditorState={area.TextLayout?.Content}
          ></RichTextEditor>
        )}
        {area.Arrangement === LayoutArrangement.LIST &&
          area.ListLayout?.Items?.map((i) => (
            <AreaListItem id={i.Id} content={i.Name} key={i.Id} />
          ))}

        {area.Arrangement === LayoutArrangement.KEYVALUELIST &&
          area.KeyValueListLayout?.Items?.map((i) => (
            <AreaKeyValueListItem
              id={i.Id}
              key={i.Id}
              itemKey={{
                Id: i.Key.Id,
                Name: i.Key.Name,
                Type: i.Key.Type,
              }}
              value={i.Value}
            />
          ))}
      </Stack>
    </Paper>
  );
};

export default AreaItem;
