import RichTextEditor from '@/components/RichTextEditor';
import { useAppSelector } from '@/features/store';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import AreaEditItem from '../AreaEditItem';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  id: string;
  area: IArea;
  focused?: boolean;
} & Partial<DraggableProvidedDragHandleProps>;

const AreaItem = ({ onClick, area, children, focused, ...props }: PropsWithChildren<AreaItemProps>) => {
  const [isHover, setIsHover] = React.useState(false);
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [focusedState, setFocusState] = useState(false);
  const layoutState = useAppSelector((state) => state.layoutState);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onClick && onClick(ref.current as HTMLElement);
  };

  useEffect(() => {
    setFocusState(focused ? focused : false);
  }, [focused]);

  const a = new Area(area);

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: 'relative',
        '&::before': focusedState
          ? {
              content: '""',
              height: '100%',
              position: 'absolute',
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
          width: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          cursor: 'move',
          display: isHover ? 'flex' : 'none',
        }}
        {...props}
      >
        <DragHandleIcon color="primary" />
      </Box>

      {layoutState.areaId === area.Id ? (
        <AreaEditItem />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h4">{a.getAreaTitle()}</Typography>
          {a.isLayoutType(LayoutType.ImageText) && area.ImageTextLayout?.Image?.Content && (
            <Stack direction={'row'} spacing={1}>
              <img
                src={`data:${area.ImageTextLayout?.Image?.ContentType};base64,${area.ImageTextLayout?.Image?.Content}`}
                alt={area.ImageTextLayout.Image.Filename}
                style={{
                  width: '15vw',
                  height: '15vw',
                }}
              />
              <RichTextEditor controllable={false} initialEditorState={area.ImageTextLayout?.Content}></RichTextEditor>
            </Stack>
          )}

          {a.isLayoutType(LayoutType.Text) && (
            <RichTextEditor controllable={false} initialEditorState={area.TextLayout?.Content}></RichTextEditor>
          )}
          {a.isLayoutType(LayoutType.List) &&
            area.ListLayout?.Items?.map((i) => <AreaListItem id={i.Id} content={i.Name} key={i.Id} />)}

          {a.isLayoutType(LayoutType.KeyValueList) &&
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
      )}
    </Paper>
  );
};

export default AreaItem;
