import RichTextEditor from '@/components/RichTextEditor';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import { Stack, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';

type AreaDisplayItemProps = {
  area: IArea;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

function AreaDisplayItem({ area, onClick }: AreaDisplayItemProps) {
  const a = new Area(area);

  return (
    <Stack spacing={1} onClick={onClick} sx={{ cursor: 'pointer' }}>
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
      {a.isLayoutType(LayoutType.List) &&
        area.ListLayout?.Items?.map((i) => <AreaListItem id={i.Id} key={i.Id} content={i.Name} />)}

      {a.isLayoutType(LayoutType.KeyValueList) &&
        area.KeyValueListLayout?.Items?.map((i) => <AreaKeyValueListItem item={i} id={i.Id} />)}
    </Stack>
  );
}

export default AreaDisplayItem;
