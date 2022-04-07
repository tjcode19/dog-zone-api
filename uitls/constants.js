Role = {
  Basic: "Basic",
  Seller: "Seller",
  Admin: "Admin",
};

//Order Status Enum

OrderStatus = {
  newOrder: "Order Placed",
  confirmed: "Order Confirmed",
  fulfilled: "Order Fulfilled",
  shipped: "Order Shipped",
  outForDelivery: "Out For Delivery",
  delivered: "Order Delivered",
};

//Address Enum
AddressType = {
  Primary: "Primary",
  Secondary: "Secondary",
  Office: "Office",
};

//ProductCategory
ProductCategory = {
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
