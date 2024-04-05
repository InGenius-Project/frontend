import RichTextEditor from '@/components/RichTextEditor';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import { Divider, Stack, Typography } from '@mui/material';
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
      <Typography variant="subtitle1">{a.getAreaTitle() || 'Untitled'}</Typography>
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
          <RichTextEditor controllable={false} initialEditorState={a.ImageTextLayout?.TextContent}></RichTextEditor>
        </Stack>
      )}

      {a.isLayoutType(LayoutType.Text) && (
        <RichTextEditor controllable={false} initialEditorState={a.TextLayout?.Content}></RichTextEditor>
      )}
      {a.isLayoutType(LayoutType.List) &&
        area.ListLayout?.Items?.map((i, index, arr) => (
          <>
            <AreaListItem id={i.Id} key={i.Id} content={i.Name} />
            {index !== arr.length - 1 && <Divider />}
          </>
        ))}
      {a.isLayoutType(LayoutType.KeyValueList) &&
        area.KeyValueListLayout?.Items?.map((i) => <AreaKeyValueListItem item={i} id={i.Id} key={i.Id} />)}
    </Stack>
  );
}

export default AreaDisplayItem;
