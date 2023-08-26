// // import React, { useEffect, useState } from "react";
// // import { useDropzone } from "react-dropzone";
// // import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// // import { Box, Stack, Typography } from "@mui/material";

// // const thumbsContainer = {
// //   display: "flex",
// //   flexDirection: "row",
// //   flexWrap: "wrap",
// //   marginTop: 16,
// // };

// // const thumb = {
// //   display: "inline-flex",
// //   borderRadius: 2,
// //   border: "1px solid #eaeaea",
// //   marginBottom: 8,
// //   marginRight: 8,
// //   width: 100,
// //   height: 100,
// //   padding: 4,
// //   boxSizing: "border-box",
// // };

// // const thumbInner = {
// //   display: "flex",
// //   minWidth: 0,
// //   overflow: "hidden",
// // };

// // const img = {
// //   display: "block",
// //   width: "auto",
// //   height: "100%",
// // };

// // function PreviewImageUpload(props) {
// //   const [files, setFiles] = useState([]);
// //   const { getRootProps, getInputProps } = useDropzone({
// //     accept: {
// //       "image/*": [],
// //     },
// //     onDrop: (acceptedFiles) => {
// //       setFiles(
// //         acceptedFiles.map((file) =>
// //           Object.assign(file, {
// //             preview: URL.createObjectURL(file),
// //           })
// //         )
// //       );
// //     },
// //   });

// //   const thumbs = files.map((file) => (
// //     <div style={thumb} key={file.name}>
// //       <div style={thumbInner}>
// //         <img
// //           src={file.preview}
// //           style={img}
// //           // Revoke data uri after image is loaded
// //           onLoad={() => {
// //             URL.revokeObjectURL(file.preview);
// //           }}
// //         />
// //       </div>
// //     </div>
// //   ));

// //   useEffect(() => {
// //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
// //     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
// //   }, []);

// //   return (
// //     <section
// //       className="container"
// //       sx={{
// //         borderRadius: 1,
// //         position: "absolute",

// //         overflow: "hidden",
// //       }}
// //     >
// //       <Stack
// //         sx={{ display: "flex", flexDirection: "column" }}
// //         alignItems="center" // Căn giữa theo chiều dọc
// //         {...getRootProps({ className: "dropzone" })}
// //       >
// //         <input {...getInputProps()} />
// //         <AddAPhotoIcon />
// //         <Typography>Kéo hình ảnh vào đây</Typography>
// //       </Stack>
// //       <aside style={thumbsContainer}>{thumbs}</aside>
// //     </section>
// //   );
// // }

// // export default PreviewImageUpload;
// import React, { useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import { Stack, Typography } from "@mui/material";
// import cloudinaryUpload from "../utils/cloudinary";
// import RejectionFiles from "./RejectionFiles";

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

// const img = {
//   display: "block",
//   width: "auto",
//   height: "100%",
// };

// function PreviewImageUpload(props) {
//   const [files, setFiles] = useState([]);
//   const [rejectedFiles, setRejectedFiles] = useState([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/*": [],
//     },
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   }, []);

//   function handleSubmitUploadImage(e) {
//     e.preventDefault();

//     // Upload images to Cloudinary
//     const cloudinaryImages = files.map((file) => cloudinaryUpload(file));
//     console.log("Data sent to Cloudinary:", cloudinaryImages);

//     fetch("/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         images: cloudinaryImages,
//       }),
//     });
//   }

//   const thumbs = files.map((file) => (
//     <div style={thumb} key={file.name}>
//       <div style={thumbInner}>
//         <img
//           src={file.preview}
//           style={img}
//           // Revoke data uri after image is loaded
//           onLoad={() => {
//             URL.revokeObjectURL(file.preview);
//           }}
//         />
//       </div>
//     </div>
//   ));

//   return (
//     <section
//       className="container"
//       sx={{
//         borderRadius: 1,
//         position: "absolute",

//         overflow: "hidden",
//       }}
//     >
//       <Stack
//         sx={{ display: "flex", flexDirection: "column" }}
//         alignItems="center" // Căn giữa theo chiều dọc
//         {...getRootProps({ className: "dropzone" })}
//       >
//         <input {...getInputProps()} />
//         <AddAPhotoIcon />
//         <Typography>Kéo hình ảnh vào đây</Typography>
//       </Stack>
//       <aside style={thumbsContainer}>{thumbs}</aside>
//       {rejectedFiles.length > 0 && (
//         <RejectionFiles rejectedFiles={rejectedFiles} />
//       )}
//       <div style={{ marginTop: 8 }}></div>
//     </section>
//   );
// }

// export default PreviewImageUpload();
