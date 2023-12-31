const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      console.log({ isEmailExists });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const userSignup = async (req, res) => {
  const { email, name, birth, password, rePassword } = req.body;
  // signup User
  console.log({ req: req.body });
  try {
    const user = await User.signupUser(email, name, birth, password, rePassword);
    const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET_KEY, {
      expiresIn: "3d"
    });
    res.status(200).json({
      user: {
        ...user._doc,
        token
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const userLogin = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.loginUser(identifier, password);
    const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET_KEY, {
      expiresIn: "3d"
    });
    res.status(200).json({
      user: {
        ...user._doc,
        token
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET_KEY, {
      expiresIn: "3d"
    });
    res.status(200).json({
      user: {
        ...user._doc,
        token
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { checkEmail, userSignup, userLogin, getUser };

// user image will work as an update
