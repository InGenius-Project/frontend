import { IInnerKeyValueItem, IKeyValueItem } from '@/types/interfaces/IArea';
import { IInnerTag, ITag } from '@/types/interfaces/ITag';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  Autocomplete,
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

const filter = createFilterOptions<IInnerTag>({});

type AreaKeyValueListItemProps = {
  id: string;
  item: IInnerKeyValueItem;
  options?: ITag[];
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: (item: IInnerKeyValueItem, newItem: IInnerKeyValueItem) => void;
  control?: React.ReactNode;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaKeyValueListItem({
  id,
  item,
  editable = false,
  onClickDelete,
  onChange,
  options,
  control,
  ...props
}: AreaKeyValueListItemProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClickDelete && onClickDelete(id);
  };

  return (
    <ListItem
      sx={{
        padding: 2,
        alignItems: 'flex-end',
      }}
      secondaryAction={
        editable ? (
          <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
            <IconButton onClick={handleDeleteClick}>
              <ClearIcon />
            </IconButton>
            <IconButton {...props}>
              <DragIndicatorIcon />
            </IconButton>
          </Stack>
        ) : undefined
      }
    >
      {editable ? (
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={1}
          sx={{
            flex: '1 1 auto',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            widht: '100%',
            pr: '88px',
          }}
        >
          <Autocomplete
            multiple
            options={options || []}
            value={item.Key}
            fullWidth={isMobile}
            filterSelectedOptions
            onChange={(_, i) => {
              onChange &&
                onChange(item, {
                  ...item,
                  Key: i,
                });
            }}
            isOptionEqualToValue={(option, value) => option.Id === value.Id}
            selectOnFocus
            handleHomeEndKeys
            getOptionLabel={(o) => o.Name}
            renderInput={(params) => <TextField {...params} variant="standard" />}
            sx={{
              flex: isMobile ? '1 0 auto' : '0 0 15em',
            }}
          />

          <Divider orientation="vertical" flexItem />
          <TextField
            variant="standard"
            key={`value-${item.Id}`}
            value={item.Value}
            onChange={(e) => {
              e.preventDefault();
              onChange &&
                onChange(item, {
                  ...item,
                  Value: e.target.value,
                });
            }}
            fullWidth
            sx={{ flex: '1 1 auto', height: '100%' }}
          />
        </Stack>
      ) : (
        <Stack spacing={1} direction={'row'}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              minWidth: '5em',
            }}
          >
            {item.Key?.map((k) => k.Name).join(', ')}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">{item.Value}</Typography>
        </Stack>
      )}
    </ListItem>
  );
}

export default AreaKeyValueListItem;
