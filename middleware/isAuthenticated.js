import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        isSuccess: false,
        message: "user not authenticated",
      });
    }
    const secretKey =
      process.env.SECRET_KEY || "fallback_secret_key_change_in_production";
    const decode = jwt.verify(token, secretKey);
    if (!decode) {
      return res.status(401).json({
        isSuccess: false,
        message: "Invlid token",
      });
    }
    req.id = decode.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      isSuccess: false,
      message: "Invalid token",
    });
  }
};
