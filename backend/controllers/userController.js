import { User } from "../models/userModel.js";
import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return next(catchError("send all required fields", 400));
      //  res.status(400).send("send all required fields");
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(catchError("User already Registered", 400));
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({ message: "Account created successfully", data });
  } catch (err) {
    next(catchError(err.message));
    // res.status(500).send({ message: err.message });
  }

  return;
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          email: user.email,
          username: user.username,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );
      const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      };
      res.cookie("jwt", accessToken, cookieOptions);
      res.status(200).json({ data: user });
    } else {
      return next(catchError("User not Registered", 400));
      // res.status(400).json({ message: "User not Registered" });
    }
  } catch (error) {
    next(catchError(error.message));
    res.status(500).send({ message: error.message });
  }
};

export const currentUser = (req, res) => {
  res.json({ message: "currentUser" });
};
