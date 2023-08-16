const Notification = require("../models/Notification");
const User = require("../models/User");

const followUser = async (req, res) => {
  const id = req.user._id;
  const receiver = req.params.id;
  // try {
  //   if ((await this.findById(tweetId)).retweets.includes(id)) {
  //     // throw Error("Tweet already been liked!");
  //     await this.findByIdAndUpdate(tweetId, { $pull: { retweets: id } });
  //     await User.findByIdAndUpdate(id, { $pull: { retweets: tweetId } });
  //   } else {
  //     const updatedTweet = await this.findByIdAndUpdate(tweetId, { $push: { retweets: id } });
  //     const user = updatedTweet.author;
  //     if (id.toString() !== user.toString()) {
  //       await Notification.notifyUser(user, id, {
  //         notificationType: "ALL",
  //         action: "RETWEET",
  //         tweet: tweetId
  //       });
  //     }
  //     await User.findByIdAndUpdate(id, { $push: { retweets: tweetId } });
  //   }
  // } catch (error) {
  //   throw Error(error);
  // }

  if (id === receiver) {
    throw Error("you can't follow yourself!!");
  }
  try {
    if ((await User.findById(id)).following.includes(receiver)) {
      await User.findByIdAndUpdate(id, { $pull: { following: receiver } });
      await User.findByIdAndUpdate(receiver, { $pull: { followers: id } });
    } else {
      await User.findByIdAndUpdate(id, { $push: { following: receiver } });
      await User.findByIdAndUpdate(receiver, { $push: { followers: id } });
      await Notification.notifyUser(receiver, id, {
        notificationType: "ALL",
        action: "FOLLOW"
      });
    }
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const unFollowUser = async (req, res) => {
  const id = req.user._id;
  const receiver = req.params.id;
  try {
    await User.findByIdAndUpdate(receiver, { $pull: { followers: id } });
    await User.findByIdAndUpdate(id, { $pull: { following: receiver } });
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  const id = req.user._id;
  const limit = req.params.limit;
  try {
    const users = await User.find({ _id: { $nin: id }, followers: { $nin: id } }).limit(Number(limit));
    res.status(200).json({ message: "ok", data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  followUser,
  unFollowUser,
  getUsers
};
