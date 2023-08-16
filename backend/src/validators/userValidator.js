const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");
// const User = require('../models/User');

const createValidator = async function(email, name, birth) {
  if (!email || !name || !birth) {
    throw Error("All field must be filled");
  }
  if (!isEmail(email)) {
    throw Error("Email is invalid");
  }
  const date = new Date(birth);
  if (date.toString() === "Invalid Date") {
    throw Error("Invalid Date");
  }
  const lowerBound = new Date("1900-01-01");
  const upperBound = new Date("2020-01-01");

  if (date > upperBound || date < lowerBound) {
    throw Error("Birth date is invalid");
  }
  const doesEmailExists = await this.findOne({ email });
  if (doesEmailExists) {
    throw Error("Email is already exists");
  }
  return true;
};

const signupValidator = async function(
  email,
  name,
  birth,
  password,
  rePassword
) {
  if (!email || !name || !birth || !password || !rePassword) {
    throw Error("All field must be filled");
  }
  if (password !== rePassword) {
    throw Error("Password must be match");
  }
  if (!isStrongPassword(password, { minSymbols: 0 })) {
    throw Error("Password is not strong enough");
  }
  // generate username
  const separators = [" ", "-", "."];
  let username = name
    .split(new RegExp(`[${separators.join("")}]`))
    .join("")
    .toLowerCase();
  while (username.length < 3) {
    username = username + "_";
  }
  let usernameSuffix = 0;
  while (true) {
    const count = await this.countDocuments({ username });
    if (count === 0) {
      break;
    }
    usernameSuffix++;
    username = `${username.split("_").join("")}_${usernameSuffix}`;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email: email.toLowerCase(),
    username: username,
    birth: new Date(birth),
    password: hash
  });
  return user;
};

const loginValidator = async function(identifier, password) {
  if (!identifier || !password) {
    throw Error("All field must be filled");
  }
  identifier = identifier.toLowerCase();
  if (isEmail(identifier)) {
    var user = await this.findOne({ email: identifier });
  } else {
    var user = await this.findOne({ username: identifier });
  }
  if (!user) {
    throw Error("user doesn't exists!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorect passowrd!");
  }
  return user;
};

module.exports = { signupValidator, loginValidator, createValidator };
