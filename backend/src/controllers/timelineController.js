const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { getAverage } = require("../utils/getTweetsAverage");

const getTrends = async (req, res) => {};
const tweetsForYou = async (req, res) => {
  try {
    const unorderedTweets = await Tweet.find()
      .populate({
        path: "author"
      })
      .populate({
        path: "quotedTweet",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "parentTweet",
        populate: {
          path: "author",
          model: "User"
        }
      });

    const orderedTweets = getAverage(unorderedTweets);
    res.status(200).json({ message: "ok", data: orderedTweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const TweetsFollowing = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const followingUsers = user.following;
    const tweets = await Tweet.find({ author: { $in: followingUsers } })
      .populate({
        path: "author"
      })
      .populate({
        path: "quotedTweet",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "parentTweet",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "ok", data: tweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTrends,
  tweetsForYou,
  TweetsFollowing
};
