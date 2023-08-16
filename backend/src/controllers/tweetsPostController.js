const Tweet = require("../models/Tweet");
const { uploadMultiple } = require("../utils/uploadCloudinary");

const postTweet = async (req, res) => {
  const post = req.body;
  const author = req.user._id;
  const media = req.files.media;

  try {
    if (media) {
      var uploadedFiles = await uploadMultiple(author, media);
    }

    const tweet = await Tweet.createTweet({ ...post }, author, uploadedFiles);
    res.status(200).json({ message: "ok", data: tweet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTweet = async (req, res) => {
  const id = req.params.id;
  const author = req.user._id;
  try {
    await Tweet.deleteTweet(author, id);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postLike = async (req, res) => {
  const tweetId = req.params.id;
  const id = req.user._id;
  try {
    await Tweet.likeTweet(tweetId, id);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postRetweet = async (req, res) => {
  const tweetId = req.params.id;
  const id = req.user._id;
  try {
    await Tweet.reTweet(tweetId, id);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postBookmarks = async (req, res) => {
  const post = req.params.id;
  const author = req.user._id;
  try {
    const tweet = await Tweet.addToBookmark(post, author);
    res.status(200).json({ message: "ok", data: tweet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postRetweet,
  postTweet,
  deleteTweet,
  postLike,
  postBookmarks
};
