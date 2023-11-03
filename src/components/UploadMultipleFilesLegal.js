import isString from "lodash/isString";
import { useDropzone } from "react-dropzone";

import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import RejectionFiles from "./RejectionFiles";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  height: 200,
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "#F4F6F8",
  border: `1px dashed ${theme.palette.grey[600]}`, // Corrected the border color
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// to upload multiple files by drag-and-drop
function UploadMultipleFilesLegal({
  error = false,
  file,
  helperText,
  sx,
  ...other
}) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    ...other,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <AddAPhotoRoundedIcon />
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "#637381" }}
            textAlign="center"
          >
            Hình ảnh pháp lý
          </Typography>
        </Stack>

        {/* to preview images to upload in the drop zone */}
        {
          <Box
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
              overflow: "hidden",
            }}
          >
            {acceptedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "inline-block",
                  width: "calc(33.33% - 8px)",
                  height: "100%",
                  padding: 2,
                  boxSizing: "border-box",
                }}
              >
                <img
                  alt={`file preview ${index}`}
                  src={URL.createObjectURL(file)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        }

        {file && (
          <Box
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
              overflow: "hidden",
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img
              alt="file preview"
              src={isString(file) ? file : file.preview}
            />
          </Box>
        )}
      </DropZoneStyle>

      {/* in case of error */}
      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}

export default UploadMultipleFilesLegal;
