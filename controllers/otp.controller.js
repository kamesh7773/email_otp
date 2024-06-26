const otpService = require("../services/otp_service");

exports.otpLogin = (req, res, next) => {
  otpService.sendOtp(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: "error",
        data: error,
      });
    }
    return res.status(200).send({
      message: "Email Send",
      data: results,
    });
  });
};

exports.verifyOTP = (req, res, next) => {
  otpService.verifyOTP(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: "error",
        data: error,
      });
    }
    return res.status(200).send({
      message: "OTP Verified",
      data: results,
    });
  });
};
