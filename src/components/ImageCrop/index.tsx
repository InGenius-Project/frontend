import { IImageInfo } from '@/types/interfaces/IArea';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useUpdateEffect } from 'ahooks';
import React, { useMemo, useRef, useState } from 'react';
import ReactCrop, { Crop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import UploadImageButton from './UploadImageButton';
import canvasPreview from './canvasPreview';
import resizeImage from './resizeImage';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const MAX_KB_SIZE = 100;
const MAX_CANVAS_SIZE = MAX_KB_SIZE * 1024; // 64KB
const MIN_DIMENSION = 150;

function base64ToBytes(base64: string): number {
  const binaryString = atob(base64);
  const bytes = binaryString.length;
  return bytes;
}

type ImageCropProps = {
  width: number;
  height: number;
  image?: IImageInfo;
  altComponent?: React.ReactNode;
  onChange?: (image: IImageInfo | undefined) => void;
  onCropDone?: (image: IImageInfo | undefined) => void;
  onChangeFileName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  circularCrop?: boolean;
};
export default function ImageCrop({
  image,
  circularCrop,
  altComponent,
  onCropDone,
  onChangeFileName,
  width,
  height,
}: ImageCropProps) {
  const [imageState, setImageState] = useState<IImageInfo | undefined>(image);
  const [imgSrc, setImgSrc] = useState('');

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [expectSizeState, setExpectSizeState] = useState<number>(0);
  const [crop, setCrop] = useState<Crop>();
  const [open, setOpen] = React.useState(false);

  const ASPECT_RATIO = useMemo(() => {
    return width && height ? width / height : 1;
  }, [width, height]);

  useUpdateEffect(() => {
    setImageState && setImageState(image);
  }, [image]);

  const handleSelectFile = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });

      reader.readAsDataURL(e.target.files[0]);
    }
    handleClickOpen();
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      canvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
      if (imgRef.current && previewCanvasRef.current && crop) {
        var dataUrl = previewCanvasRef.current.toDataURL();

        function dataURItoBlob(dataURI: string) {
          var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
          var binary = atob(dataURI.split(',')[1]);
          var array = [];
          for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], { type: mime });
        }

        resizeImage(dataUrl, 100, 1).then((res) => {
          const newImageState: IImageInfo = {
            Id: imageState?.Id || '',
            AltContent: imageState?.AltContent || '',
            Uri: URL.createObjectURL(dataURItoBlob(res)),
          };

          onCropDone && onCropDone(newImageState);

          setImageState(newImageState);
          setOpen(false);
        });
      }
    }
  };

  const handleCompleteCrop = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      canvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
      if (imgRef.current && previewCanvasRef.current && crop) {
        const dataUrl = previewCanvasRef.current.toDataURL();
        setExpectSizeState(Math.floor((base64ToBytes(dataUrl.split(',')[1]) / 1024) * 100) / 100);
      }
    }
  };

  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="laptop">
        <DialogTitle>裁切圖片</DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <TextField
            sx={{ mt: 1 }}
            label="檔案名稱"
            value={imageState?.AltContent || ''}
            onChange={(e) => {
              setImageState((prev) => ({
                Uri: prev?.Uri || '',
                Id: prev?.Id || '',
                AltContent: (e.target as any).value,
              }));
              onChangeFileName && onChangeFileName(e);
            }}
          ></TextField>

          <Box
            sx={{
              width: '100%',
              height: '55vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={handleCompleteCrop}
                minWidth={10}
                aspect={ASPECT_RATIO}
                circularCrop={circularCrop}
              >
                <img
                  ref={imgRef}
                  alt={imageState ? imageState.AltContent : 'Crop preview'}
                  src={imgSrc}
                  style={{
                    maxHeight: '55vh',
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}

            {crop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  display: 'none',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Typography color={expectSizeState > MAX_CANVAS_SIZE ? 'error' : 'primary'}>
            檔案大小: {expectSizeState}
          </Typography>
          <Button onClick={handleClose}>裁切</Button>
        </DialogActions>
      </Dialog>

      <Stack direction="row" spacing={2} width={'inherit'} height={'inherit'}>
        {!imageState ? (
          <UploadImageButton component="label" width={'inherit'} height={'inherit'} circularCrop={circularCrop}>
            {altComponent ? (
              altComponent
            ) : (
              <>
                {' '}
                <ImageOutlinedIcon />
                <Typography variant="body1">上傳圖片</Typography>
              </>
            )}

            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              onClick={(e) => ((e.target as any).value = '')}
              accept="image/*"
            />
          </UploadImageButton>
        ) : (
          <UploadImageButton
            component="label"
            color="white"
            width={'inherit'}
            height={'inherit'}
            circularCrop={circularCrop}
          >
            <img
              src={imageState.Uri}
              alt={imageState?.AltContent}
              style={{
                overflow: 'hidden',
                padding: 0,
                width: 'inherit',
                height: 'inherit',
                objectFit: 'cover',
              }}
            />
            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              onClick={(e) => ((e.target as any).value = '')}
              accept="image/*"
            />
          </UploadImageButton>
        )}
      </Stack>
    </>
  );
}
