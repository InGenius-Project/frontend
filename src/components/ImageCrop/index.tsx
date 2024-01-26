import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  generateImageBase64Src,
  setImageContent,
  setImageFilename,
} from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import React, { useRef, useState } from "react";
import ReactCrop, {
  Crop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import UploadImageButton from "./UploadImageButton";
import canvasPreview from "./canvasPreview";

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
const MAX_KB_SIZE = 100;
const MAX_CANVAS_SIZE = MAX_KB_SIZE * 1024; // 64KB
const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;
function base64ToBytes(base64: string): number {
  const binaryString = atob(base64);
  const bytes = binaryString.length;
  return bytes;
}

type ImageCropProps = {
  width?: string | number;
  height?: string | number;
};
export default function ImageCrop({
  width = 100,
  height = 100,
}: ImageCropProps) {
  const theme = useTheme();
  const { image: imageState } = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();
  const [imgSrc, setImgSrc] = useState("");

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [expectSizeState, setExpectSizeState] = useState<number>(0);
  const [crop, setCrop] = useState<Crop>();
  const [open, setOpen] = React.useState(false);

  const handleSelectFile = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    handleClickOpen();
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      canvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );
      if (imgRef.current && previewCanvasRef.current && crop) {
        const dataUrl = previewCanvasRef.current.toDataURL();
        const splitDataUrl = dataUrl.split(",");
        if (base64ToBytes(splitDataUrl[1]) <= MAX_CANVAS_SIZE) {
          dispatch(setImageContent(splitDataUrl[0]));
          dispatch(setImageContent(splitDataUrl[1]));
          setOpen(false);
        } else {
          toast.error(`檔案大小超過 ${MAX_KB_SIZE}KB`);
        }
      }
    }
  };

  const handleCompleteCrop = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      canvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );
      if (imgRef.current && previewCanvasRef.current && crop) {
        const dataUrl = previewCanvasRef.current.toDataURL();
        setExpectSizeState(
          Math.floor((base64ToBytes(dataUrl.split(",")[1]) / 1024) * 100) / 100
        );
      }
    }
  };

  return (
    <Box className="App">
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="laptop">
        <DialogTitle>裁切圖片</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            sx={{ mt: 1 }}
            label="檔案名稱"
            value={imageState?.filename || ""}
            onChange={(e) =>
              imageState && dispatch(setImageFilename((e.target as any).value))
            }
          ></TextField>

          <Box
            sx={{
              width: "100%",
              height: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={handleCompleteCrop}
                minWidth={10}
                aspect={ASPECT_RATIO}
              >
                <img
                  ref={imgRef}
                  alt={imageState ? imageState.filename : "Crop preview"}
                  src={imgSrc}
                  style={{
                    maxHeight: "55vh",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}

            {crop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  display: "none",
                  objectFit: "contain",
                  height,
                  width,
                }}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Typography
            color={expectSizeState > MAX_CANVAS_SIZE ? "error" : "primary"}
          >
            檔案大小: {expectSizeState}
          </Typography>
          <Button onClick={handleClose}>裁切</Button>
        </DialogActions>
      </Dialog>

      <Stack direction="row" spacing={2}>
        {imageState.content === "" ? (
          <UploadImageButton
            variant="outlined"
            component="label"
            width={width}
            height={height}
            startIcon={<ImageOutlinedIcon />}
          >
            <Typography variant="body1">上傳圖片</Typography>

            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              onClick={(e) => ((e.target as any).value = "")}
              accept="image/*"
            />
          </UploadImageButton>
        ) : (
          <UploadImageButton component="label" width={width} height={height}>
            <img
              width={256}
              height={256}
              src={generateImageBase64Src(
                imageState?.contentType,
                imageState?.content
              )}
              alt={imageState?.filename}
              style={{
                overflow: "hidden",
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.primary.main}`,
                width,
                height,
                padding: 0,
              }}
            />
            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              onClick={(e) => ((e.target as any).value = "")}
              accept="image/*"
            />
          </UploadImageButton>
        )}
      </Stack>
    </Box>
  );
}
