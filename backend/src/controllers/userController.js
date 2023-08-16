const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const Redis = require("ioredis");
const jwt = require("jsonwebtoken");
const redis = new Redis();

const userCreate = async (req, res) => {
  const { email, name, birth } = req.body;
  try {
    // validate create User (email, birth)
    await User.createUser(email, name, birth);
    // Generate a unique key for this user's session
    const sessionKey = uuidv4();
    // Store the email, birth and name data in Redis
    await redis.set(sessionKey, JSON.stringify({ email, name, birth }));
    // Create a verification token with the session key and send it back to the client
    const token = jwt.sign({ sessionKey }, process.env.SIGNUP_SECRET_KEY, {
      expiresIn: "15m"
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const userSignup = async (req, res) => {
  const { password, rePassword, token } = req.body;
  if (!token) {
    throw Error("Session is not valid");
  }
  const { sessionKey } = jwt.verify(token, process.env.SIGNUP_SECRET_KEY);
  // Fetch data from Redis
  const sessionData = await redis.get(sessionKey);
  const { email, name, birth } = JSON.parse(sessionData);
  // signup User
  try {
    const user = await User.signupUser(email, name, birth, password, rePassword);
    const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET_KEY, {
      expiresIn: "3d"
    });
    await redis.del(sessionKey);
    res.status(200).json({
      user: {
        ...user._doc,
        token
      }
    });
  } catch (error) {
    res.status(400).error({ message: error.message });
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

module.exports = { userCreate, userSignup, userLogin, getUser };

// user image will work as an update
