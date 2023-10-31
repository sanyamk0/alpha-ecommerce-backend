const passport = require("passport");

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
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDEyNjlkNzMzMDc3ZDNlMGI0NzU5ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NzY4NTQxfQ.gjeahgiF1vPW_g2CVYyC_PtPwk56YWDV61mZLMxY1_s";
  return token;
};
