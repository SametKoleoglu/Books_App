import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json({ error: "username already exists" });
    }
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }

    const newUser = await User.create(req.body);

    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "user created successfully", data: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        error: "validation error",
        validationErrors,
      });
    } else {
      console.log("Error at creating user", error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // check if password correct
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "your password is not correct" });
    }

    user.password = undefined;

    //Generate Token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    return res
      .status(200)
      .json({ message: "user login successfully", user, token });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      for (let field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        error: "validation error",
        validationErrors,
      });
    } else {
      console.log("Error at logging user", error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
};

export { register, login };
