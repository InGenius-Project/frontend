import RichTextEditor from '@/components/RichTextEditor';
import { setLayoutByArea } from '@/features/layout/layoutSlice';
import { useAppDispatch } from '@/features/store';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import AreaListItem from '../AreaKeyValueListItem';
import AreaKeyValueListItem from '../AreaKeyValueListItem';

type AreaDisplayItemProps = {
  area: IArea;
};

function AreaDisplayItem({ area }: AreaDisplayItemProps) {
  const dispatch = useAppDispatch();
  const a = new Area(area);

  return (
    <Stack spacing={1} onClick={() => dispatch(setLayoutByArea(a))} sx={{ cursor: 'pointer' }}>
      <Typography variant="h4">{a.getAreaTitle() || 'Untitled'}</Typography>
      {a.isLayoutType(LayoutType.ImageText) && a.ImageTextLayout?.Image?.Content && (
        <Stack direction={'row'} spacing={1}>
          <img
            src={`data:${a.ImageTextLayout?.Image?.ContentType};base64,${a.ImageTextLayout?.Image?.Content}`}
            alt={a.ImageTextLayout.Image.Filename}
            style={{
              width: '15vw',
              height: '15vw',
            }}
          />
          <RichTextEditor controllable={false} initialEditorState={a.ImageTextLayout?.Content}></RichTextEditor>
        </Stack>
      )}

      {a.isLayoutType(LayoutType.Text) && (
        <RichTextEditor controllable={false} initialEditorState={a.TextLayout?.Content}></RichTextEditor>
      )}
      {a.isLayoutType(LayoutType.List) && area.ListLayout?.Items?.map((i) => <AreaListItem id={i.Id} key={i.Id} />)}

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
  );
}

export default AreaDisplayItem;
