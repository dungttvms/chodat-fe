// import React from "react";
// import { useDispatch } from "react-redux";

// import { Button, Stack } from "@mui/material";

// function ActionButton({ currentUserId, targetUserId, friendship, sx }) {
//   const dispatch = useDispatch();

//   if (currentUserId === targetUserId) return null;

//   const deleteUserByAdminButton = (
//     <Button
//       sx={{ fontSize: "0.6rem", ...sx }}
//       size="small"
//       variant="contained"
//       onClick={() => dispatch(sendFriendRequest({ targetUserId }))}
//     >
//       Send Request
//     </Button>
//   );

//   if (!friendship) return btnSendRequest;

//   const btnUnFriend = (
//     <Button
//       sx={{ fontSize: "0.6rem", ...sx }}
//       size="small"
//       variant="contained"
//       color="error"
//       onClick={() => dispatch(removeFriend({ targetUserId }))}
//     >
//       UnFriend
//     </Button>
//   );
//   const btnResend = (
//     <Button
//       sx={{ fontSize: "0.6rem", ...sx }}
//       size="small"
//       variant="contained"
//       onClick={() => dispatch(sendFriendRequest({ targetUserId }))}
//     >
//       {friendship.from === currentUserId ? "Resend" : "Send"} Request
//     </Button>
//   );
//   const btnCancelRequest = (
//     <Button
//       sx={{ fontSize: "0.6rem", ...sx }}
//       size="small"
//       variant="contained"
//       color="error"
//       onClick={() => dispatch(cancelRequest({ targetUserId }))}
//     >
//       Cancel Request
//     </Button>
//   );
//   const btnGroupReact = (
//     <Stack direction="row" spacing={1}>
//       <Button
//         sx={{ fontSize: "0.6rem", ...sx }}
//         size="small"
//         variant="contained"
//         color="success"
//         onClick={() => dispatch(acceptRequest({ targetUserId }))}
//       >
//         Accept
//       </Button>
//       <Button
//         sx={{ fontSize: "0.6rem", ...sx }}
//         size="small"
//         variant="contained"
//         color="error"
//         onClick={() => dispatch(declineRequest({ targetUserId }))}
//       >
//         Decline
//       </Button>
//     </Stack>
//   );
// }
// export default ActionButton;
