import { useSearchPhotoQuery } from '@/features/api/unsplash/searchPhoto';
import { setImage } from '@/features/layout/layoutSlice';
import { store, useAppDispatch } from '@/features/store';
import { IUnsplashPhoto } from '@/types/interfaces/IUnsplashPhoto';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Modal,
  Paper,
  TextField,
} from '@mui/material';
import { useDebounce } from 'ahooks';
import React, { useEffect, useState } from 'react';

type AreaUnsplashImageModalProps = {
  onClose: () => void;
  onChange?: (image: IUnsplashPhoto) => void;
  open: boolean;
};

function AreaUnsplashImageModal({ onClose, open, onChange }: AreaUnsplashImageModalProps) {
  const [searchInputState, setSearchInputState] = useState<string>('');
  const debounceSearchInput = useDebounce(searchInputState, { wait: 1000 });
  const [pageState, setPageState] = useState<number>(1);
  const imagelistref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = store.getState();
    setSearchInputState(state.layoutState.title);
  }, []);

  const { data: searchPhotoData, isFetching: isFetchingPhoto } = useSearchPhotoQuery(
    {
      query: debounceSearchInput,
      page: pageState,
      per_page: 24,
    },
    {
      skip: !debounceSearchInput || debounceSearchInput === '',
    },
  );
  const photos = searchPhotoData?.results || [];

  useEffect(() => {
    const onScroll = () => {
      if (!imagelistref.current) return;

      const scrolledToBottom =
        imagelistref.current.scrollHeight - imagelistref.current.scrollTop - 20 < imagelistref.current.clientHeight;
      if (scrolledToBottom && !isFetchingPhoto) {
        setPageState(pageState + 1);
      }
    };

    if (imagelistref.current) {
      const currentRef = imagelistref.current;
      currentRef.addEventListener('scroll', onScroll);

      return function () {
        currentRef.removeEventListener('scroll', onScroll);
      };
    }
  }, [isFetchingPhoto, pageState]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputState(e.target.value);
  };

  const handleClickImageListItem = (item: IUnsplashPhoto) => {
    onChange && onChange(item);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: 4,
          width: '80vw',
        }}
      >
        <TextField
          value={searchInputState}
          onChange={handleSearchInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        ></TextField>
        <Box
          sx={{
            height: '70vh',
            overflowY: 'auto',
          }}
          ref={imagelistref}
        >
          <ImageList cols={3} gap={8} rowHeight={150}>
            {photos.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{
                  overflow: 'hidden',
                }}
              >
                <img
                  srcSet={item.urls.small + `?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
                  src={item.urls.small + `?w=150&h=150&fit=crop&auto=format`}
                  alt={item.alt_description}
                  loading="lazy"
                />
                <ImageListItemBar
                  onClick={() => handleClickImageListItem(item)}
                  sx={{
                    content: '"選擇此圖"',
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      coloer: 'white',
                    },
                  }}
                ></ImageListItemBar>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Paper>
    </Modal>
  );
}

export default AreaUnsplashImageModal;
