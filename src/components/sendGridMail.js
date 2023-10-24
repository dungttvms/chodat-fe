require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const SEND_GRID_API_KEY = require("../app/config");
sgMail.setApiKey(SEND_GRID_API_KEY);
const msg = {
  to: "tiendungtran.ttd@gmail.com", // Change to your recipient
  from: "chodatgialai@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun Demo",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
