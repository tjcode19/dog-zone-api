Role = {
  Basic: "Basic",
  Seller: "Seller",
  Admin: "Admin",
};

AddressType = {
  Primary: "Primary",
  Secondary: "Secondary",
  Office: "Office",
};

//Response code and messages enum
ResponseDetails = {
  TokenNotProvided: {
    responseCode: "003",
    responseMessage: "Bearer Token not provided",
  },
  InvalidToken: {
    responseCode: "004",
    responseMessage: "Invalid Bearer Token",
  },
};

module.exports = { Role, AddressType, ResponseDetails };
