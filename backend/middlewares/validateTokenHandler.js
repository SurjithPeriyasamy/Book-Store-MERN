import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(catchError("JWT Token is missing", 401));
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(catchError(err.message, 401));
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(catchError(error.message));
  }
};
