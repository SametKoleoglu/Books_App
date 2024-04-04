import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid auth header format" });
  }

  const token = tokenParts[1];
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);


    req.user = await User.findById(decodedToken.userId);


    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
