import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return next(catchError(err.message, 401));
        }
        req.user = decoded;
        return next();
      });
    }
  } catch (error) {
    next(catchError(error.message));
  }
};
