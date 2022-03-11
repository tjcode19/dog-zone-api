const AccessControl = require("accesscontrol");
const ac = new AccessControl();
const Role = require("./constants");

const roles = function () {
  ac.grant(Role.Basic).readOwn("profile").updateOwn("profile");

  ac.grant(Role.Seller).extend(Role.Basic).readAny("profile");

  ac.grant(Role.Admin)
    .extend(Role.Basic)
    .extend(Role.Seller)
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
};

module.exports = roles;
