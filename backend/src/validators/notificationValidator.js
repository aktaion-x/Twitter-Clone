const User = require("../models/User");

const notifyUserValidator = async function(recipient, sourceUser, details) {
  if (recipient === sourceUser) {
    return;
  }
  console.log(recipient === sourceUser);
  const notification = await this.create({
    recipient,
    sourceUser,
    notificationType: details.notificationType,
    action: details.action,
    tweet: details.tweet
  });
  await User.findByIdAndUpdate(recipient, {
    $push: { notification: notification._id }
  });
};

module.exports = { notifyUserValidator };
