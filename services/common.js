const passport = require("passport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sanyamkumar002@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  //TODO: This is temporary token for testing without cookie
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDEyNjlkNzMzMDc3ZDNlMGI0NzU5ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NzY4NTQxfQ.gjeahgiF1vPW_g2CVYyC_PtPwk56YWDV61mZLMxY1_s";
  return token;
};

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"Alpha" <sanyamkumar002@gmail.com>',
    to: to,
    subject,
    text,
    html,
  });
  return info;
};
