const grantAccess = function (roles = []) {
  return async (req, res, next) => {
    try {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({
          responseCode: "01",
          responseMessage:
            "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  grantAccess,
  allowIfLoggedin,
};
