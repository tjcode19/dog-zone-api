const sendOtpTemp = (data) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <style>
    h1 { color: green; }
  </style>
  </head>
  <body>
    <div>
      <h1>DogZone</h1>
    </div>
    <div>
        <p>You just initiated a password reset process. Kindly enter the OTP below</p>

        <h2>${data.otp}</h2>
    </div>
  </body>
</html>

`;
};

module.exports = { sendOtpTemp };
