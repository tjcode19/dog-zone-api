const sentEmailOtp = (req, res) => {};

const sentPhoneOtp = (req, res) => {};

const verifyOTP = (req, res) => {

    res.status(200).json({
        responseCode: "00",
        responseMessage:"Operation successful",
        data: {
            token: "jjhkjdhkfjhdkjfhiuy9834y93uhrjhfkjdhfkd"
        }
    });
};
