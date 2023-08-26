import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import UploadMultipleFiles from "../UploadMultipleFiles";

// to upload multiple images by drag-and-drop
function FUploadMultipleImages({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value.length === 0;
        return (
          <UploadMultipleFiles
            files={field.value}
            accept="image/*"
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

export default FUploadMultipleImages;
