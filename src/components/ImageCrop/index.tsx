import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "ahooks";
import Grid from "@mui/material/Unstable_Grid2";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import "react-image-crop/dist/ReactCrop.css";
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useAppDispatch } from "features/store";
import { setImage } from "features/layout/layoutSlice";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const UploadImageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: 256,
  height: 256,
  padding: 0,
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImageCrop() {
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  function handleSelectFile(e?: React.ChangeEvent<HTMLInputElement>) {
    if (e && e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    handleClickOpen();
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useDebounceEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
      onDownloadCropClick();
    }
  }, [completedCrop, scale, rotate]);

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    // @ts-ignore
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    // @ts-ignore
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
    dispatch(setImage(blobUrlRef.current));
  }

  return (
    <Box className="App">
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="laptop">
        <DialogTitle>裁切圖片</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              minHeight={256}
              minWidth={256}
              aspect={1}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                  objectFit: "contain",
                  height: "55vh",
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            padding: 3,
          }}
        >
          <Grid container sx={{ flexGrow: 1 }} spacing={2}>
            <Grid mobile={1}>
              <Typography>縮放</Typography>
            </Grid>
            <Grid mobile={11} laptop={5}>
              <Slider
                marks
                getAriaValueText={() => `${scale}`}
                min={0}
                max={2}
                step={0.1}
                defaultValue={1}
                value={scale}
                disabled={!imgSrc}
                onChange={(e) => setScale(Number((e.target as any).value))}
              />
            </Grid>
            <Grid mobile={1}>
              <Typography>旋轉</Typography>
            </Grid>
            <Grid mobile={11} laptop={5}>
              <Slider
                value={rotate}
                min={-180}
                max={180}
                disabled={!imgSrc}
                onChange={(e) =>
                  setRotate(
                    Math.min(
                      180,
                      Math.max(-180, Number((e.target as any).value))
                    )
                  )
                }
              />
            </Grid>
            <Grid
              mobile={12}
              sx={{
                height: "fit-content",
                alignSelf: "flex-end",
              }}
            >
              <Button onClick={handleClose}>裁切</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Stack direction="row" spacing={2}>
        {!completedCrop ? (
          <div className="Crop-Controls">
            <UploadImageButton
              variant="outlined"
              component="label"
              startIcon={<ImageOutlinedIcon />}
            >
              <Typography variant="body1">上傳圖片</Typography>
              <Typography variant="caption">256px x 256px</Typography>
              <VisuallyHiddenInput
                type="file"
                onChange={handleSelectFile}
                accept="image/*"
              />
            </UploadImageButton>
          </div>
        ) : (
          <>
            <UploadImageButton variant="outlined" component={"label"}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: theme.shape.borderRadius,
                  objectFit: "contain",
                  width: 256,
                  height: 256,
                }}
              />
              <VisuallyHiddenInput
                type="button"
                onClick={() => handleSelectFile()}
              />
            </UploadImageButton>
          </>
        )}
        <Stack
          spacing={2}
          direction="row"
          sx={{ height: "fit-content", alignSelf: "flex-end" }}
        >
          <Button onClick={() => handleSelectFile()}>修改圖片</Button>
          <Button variant="outlined" component="label">
            選擇其他圖片
            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              accept="image/*"
            />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
