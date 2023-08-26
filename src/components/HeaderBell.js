// import {
//   NovuProvider,
//   PopoverNotificationCenter,
//   NotificationBell,
// } from "@novu/notification-center";

// import { APPLICATION_IDENTIFIER } from "../app/config";
// import useAuth from "../hooks/useAuth";

// const HeaderBell = () => {
//   const user = useAuth();
//   const SUBSCRIBER_ID = user._id;
//   console.log("SUBSCRIBER_ID", SUBSCRIBER_ID);
//   return (
//     <NovuProvider
//       subscriberId={SUBSCRIBER_ID}
//       applicationIdentifier={APPLICATION_IDENTIFIER}
//     >
//       <PopoverNotificationCenter
//         showUserPreferences={true}
//         colorScheme={"dark"}
//         position="top-start"
//         offset={10}
//       >
//         {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
//       </PopoverNotificationCenter>
//     </NovuProvider>
//   );
// };

// export default HeaderBell;

import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

export const HeaderBell = () => {
  return (
    <NovuProvider
      subscriberId={"on-boarding-subscriber-id-123"}
      applicationIdentifier={"1DJyxkYvAIDE"}
    >
      <PopoverNotificationCenter colorScheme={"light"}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
