import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        isSuccess: false,
        message: "user not authenticated",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
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
  }
};
