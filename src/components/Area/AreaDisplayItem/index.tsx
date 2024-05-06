import RichTextEditor from '@/components/RichTextEditor';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import Edit from '@mui/icons-material/Edit';
import { Button, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { MouseEventHandler } from 'react';
import { v4 as uuid } from 'uuid';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';
import { useDispatch } from 'react-redux';
import { setLayoutByArea } from '@/features/layout/layoutSlice';

type AreaDisplayItemProps = {
  area: IArea;
  onClick?: MouseEventHandler<HTMLDivElement>;
  editable?: boolean;
};

function AreaDisplayItem({ area, onClick, editable = false }: AreaDisplayItemProps) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const a = new Area(area);

  return (
    <Stack
      spacing={1}
      onClick={
        !isMobile
          ? onClick
          : () => {
              dispatch(setLayoutByArea(area));
            }
      }
      sx={{ cursor: editable ? 'pointer' : 'default' }}
    >
      <Stack direction={'row'}>
        <Typography
          variant="subtitle1"
          sx={{
            flex: '1 1 auto',
          }}
        >
          {a.getAreaTitle() || 'Untitled'}
        </Typography>
        {isMobile && (
          <Button onClick={onClick} component="div" variant="text" startIcon={<Edit />}>
            編輯
          </Button>
        )}
      </Stack>
      {a.isLayoutType(LayoutType.ImageText) && (
        <Stack direction={'row'} spacing={1}>
          {a.ImageTextLayout?.Image ? (
            <img
              src={a.ImageTextLayout.Image.Uri}
              alt={a.ImageTextLayout.Image.AltContent}
              style={{
                width: '15vw',
                height: '15vw',
              }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="placeholder"
              style={{
                width: '15vw',
                height: '15vw',
              }}
            />
          )}
          <RichTextEditor initJsonString={a.ImageTextLayout?.TextContent}></RichTextEditor>
        </Stack>
      )}

      {a.isLayoutType(LayoutType.Text) && (
        <RichTextEditor
          initJsonString={a.TextLayout?.Content}
          initMarkdownString={a.TextLayout?.Content}
        ></RichTextEditor>
      )}
      {a.isLayoutType(LayoutType.List) &&
        area.ListLayout?.Items?.map((i, index, arr) => (
          <React.Fragment key={i.Id}>
            <AreaListItem id={i.Id} key={i.Id} content={i.Name} index={index} />
            {index !== arr.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      {a.isLayoutType(LayoutType.KeyValueList) &&
        area.KeyValueListLayout?.Items?.map((i) => (
          <AreaKeyValueListItem
            item={{
              ...i,
              InnerId: uuid(),
            }}
            id={i.Id}
            key={i.Id}
          />
        ))}
    </Stack>
  );
}

export default AreaDisplayItem;
