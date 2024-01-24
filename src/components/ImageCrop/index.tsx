import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Button,
  ButtonProps,
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
  getImageBase64Src,
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
import canvasPreview from "./canvasPreview";

const UploadImageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
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
const MAX_CANVAS_SIZE = 300 * 1024; // 64KB
const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;
function base64ToBytes(base64: string): number {
  const binaryString = atob(base64);
  const bytes = binaryString.length;
  return bytes;
}
export default function ImageCrop() {
  const theme = useTheme();
  const { image: imageState } = useAppSelector((state) => state.layoutState);
  const imageBase64Src = useAppSelector(getImageBase64Src);
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
        if (base64ToBytes(dataUrl.split(",")[1]) <= MAX_CANVAS_SIZE) {
          dispatch(setImageContent(dataUrl.split(",")[1]));
          setOpen(false);
        } else {
          toast.error("圖片檔案大於300KB，請重新上傳");
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
                  height: "256px",
                  width: "256px",
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
        {!imageState ? (
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
              onClick={(e) => ((e.target as any).value = "")}
              accept="image/*"
            />
          </UploadImageButton>
        ) : (
          <>
            <img
              width={256}
              height={256}
              src={imageBase64Src}
              alt={imageState?.filename}
              style={{
                overflow: "hidden",
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.primary.main}`,
                width: 256,
                height: 256,
                padding: 0,
              }}
            />
          </>
        )}

        <Stack
          spacing={2}
          direction="row"
          sx={{ height: "fit-content", alignSelf: "flex-end" }}
        >
          <Button variant="outlined" component="label">
            修改圖片
            <VisuallyHiddenInput
              type="file"
              onChange={handleSelectFile}
              onClick={(e) => ((e.target as any).value = "")}
              accept="image/*"
            />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
