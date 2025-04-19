import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

  res.cookie("jwt", token, {
    maxAge: process.env.JWT_EXPIRY_TIME * 1000,
    httpOnly: true, // Prevent XSS attacks or cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // Prevent CSRF attacks or cross-site request forgery attacks
  });
};

export default generateTokenAndSetCookie;
