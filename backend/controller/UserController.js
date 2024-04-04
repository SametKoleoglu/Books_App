import { isValidObjectId, findDocumentById } from "../utils/index.js";
import User from "../model/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAllUser = async (req, res) => {
  try {
    const user = await User.deleteMany();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const id = req.user._id;
  if (isValidObjectId(id, res)) return;
  try {
    const user = await findDocumentById(User, id, res);
    if (!user) return;

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    res.status(200).json({
      message: "user details updated successfully",
    });
  } catch (error) {
    console.log("Error at updating user details", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
