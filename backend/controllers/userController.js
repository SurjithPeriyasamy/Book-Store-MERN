import { User } from "../models/userModel.js";

export const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(400).json({ message: "User not Registered" });
    }

    if (password === data.password) {
      return res.status(200).json(data);
    }
    res.status(400).json({ message: "enter a valid username or password" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const { username, email, password, age, role } = req.body;
    if (!username || !email || !password || !age || !role) {
      return res.status(400).send("send all required fields");
    }
    const data = await User.create(req.body);
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

  return;
};
