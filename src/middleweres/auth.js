let adminAuth = (req, res, next) => {
  let tokan = "xyzz";
  let isAdminAuthorized = tokan === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};
let userAuth = (req, res, next) => {
  let tokan = "xyz";
  let isAdminAuthorized = tokan === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
};

module.exports = ({
  userAuth,
  adminAuth,
});
