const User = require("../models/User");
const { uploadSingle } = require("../utils/uploadCloudinary");

const getUser = async (req, res) => {
  const id = req.user._id;
  const username = req.params.username;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      throw Error("User doesn't exists!");
    }
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserTweets = async (req, res) => {
  const username = req.params.username;
  try {
    let tweets = await User.findOne({ username })
      .populate({
        path: "tweets",
        populate: {
          path: "author",
          model: "User"
        },
        options: { sort: { createdAt: -1 } }
      })
      .populate({
        path: "tweets",
        populate: [
          {
            path: "parentTweet",
            model: "Tweet",
            populate: {
              path: "author",
              model: "User"
            }
          },
          {
            path: "quotedTweet",
            model: "Tweet",
            populate: {
              path: "author",
              model: "User"
            }
          }
        ],
        options: { sort: { createdAt: -1 } }
      })
      .select(["tweets" /* , "retweets" */]);
    res.status(200).json({ message: "ok", data: tweets._doc.tweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserReTweets = async (req, res) => {
  const username = req.params.username;
  try {
    let reTweets = await User.findOne({ username })
      .populate({
        path: "retweets",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "retweets",
        populate: {
          path: "parentTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        }
      })
      .populate({
        path: "retweets",
        populate: {
          path: "quotedTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        },
        options: { sort: { createdAt: -1 } }
      })
      .select(["retweets"]);
    res.status(200).json({ message: "ok", data: reTweets._doc.retweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserReplies = async (req, res) => {
  const username = req.params.username;
  try {
    let replies = await User.findOne({ username })
      .populate({
        path: "tweets",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "tweets",
        populate: {
          path: "parentTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        }
      })
      .populate({
        path: "tweets",
        populate: {
          path: "quotedTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        },
        options: { sort: { createdAt: -1 } }
      })
      .select(["tweets"]);
    res.status(200).json({ message: "ok", data: replies._doc.tweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserMedia = async (req, res) => {
  const username = req.params.username;
  try {
    let media = await User.findOne({ username })
      .populate({
        path: "tweets",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "tweets",
        populate: {
          path: "parentTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        }
      })
      .populate({
        path: "tweets",
        populate: {
          path: "quotedTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        },
        options: { sort: { createdAt: -1 } }
      })
      .select(["tweets"]);
    res.status(200).json({ message: "ok", data: media._doc.tweets });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserLikes = async (req, res) => {
  const username = req.params.username;
  try {
    let likes = await User.findOne({ username })
      .populate({
        path: "likes",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .populate({
        path: "likes",
        populate: {
          path: "quotedTweet",
          model: "Tweet",
          populate: {
            path: "author",
            model: "User"
          }
        }
      })
      .populate({
        path: "likes",
        populate: {
          path: "parentTweet",
          model: "Tweet",
          populate: {
            path: "retweets",
            model: "User"
          }
        },
        options: { sort: { createdAt: -1 } }
      })
      .sort({ createdAt: 1 })
      .select(["likes"]);
    res.status(200).json({ message: "ok", data: likes._doc.likes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserFollowers = async (req, res) => {
  const userId = req.params.id;
  try {
    let followers = await User.findById(userId)
      .populate({
        path: "followers"
      })
      .select(["followers"]);
    res.status(200).json({ message: "ok", data: followers.followers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserFollowing = async (req, res) => {
  const userId = req.params.id;
  try {
    let following = await User.findById(userId)
      .populate({
        path: "following"
      })
      .select(["following"]);
    res.status(200).json({ message: "ok", data: following.following });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserBookmarks = async (req, res) => {
  const id = req.user._id;
  try {
    let bookmarks = await User.findById(id)
      .populate({
        path: "bookmarks",
        populate: [
          {
            path: "author",
            model: "User"
          },
          {
            path: "quotedTweet",
            model: "Tweet",
            populate: {
              path: "author",
              model: "User"
            }
          },
          {
            path: "parentTweet",
            model: "Tweet",
            populate: {
              path: "author",
              model: "User"
            }
          }
        ]
      })
      .select(["bookmarks"]);
    res.status(200).json({ message: "ok", data: bookmarks.bookmarks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserNotification = async (req, res) => {
  const id = req.user._id;
  const type = req.params.type;
  try {
    let notification;
    if (type === "all") {
      notification = await User.findById(id)
        .populate({
          path: "notification",
          match: { action: { $in: ["LIKE", "FOLLOW", "RETWEET"] } },
          options: { sort: { createdAt: -1 } },
          populate: [
            {
              path: "tweet",
              populate: [
                {
                  path: "parentTweet",
                  populate: {
                    path: "author",
                    model: "User"
                  }
                },
                {
                  path: "author",
                  model: "User"
                },
                {
                  path: "quotedTweet",
                  populate: {
                    path: "author",
                    model: "User"
                  }
                }
              ]
            },
            {
              path: "sourceUser",
              model: "User"
            }
          ]
        })
        .select(["notification"]);
    } else if (type === "mentions") {
      notification = await User.findById(id)
        .populate({
          path: "notification",
          match: { action: { $in: ["QUOTED", "REPLY"] } },
          options: { sort: { createdAt: -1 } },
          populate: [
            {
              path: "tweet",
              populate: [
                {
                  path: "parentTweet",
                  populate: {
                    path: "author",
                    model: "User"
                  }
                },
                {
                  path: "author",
                  model: "User"
                },
                {
                  path: "quotedTweet",
                  populate: {
                    path: "author",
                    model: "User"
                  }
                }
              ]
            },
            {
              path: "sourceUser",
              model: "User"
            }
          ]
        })
        .select(["notification"]);
    }
    res.status(200).json({ message: "ok", data: notification.notification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserSettings = async (req, res) => {
  const id = req.user._id;
  try {
    let settings = await User.findById(id).select(["displaySensitive", "isPrivate"]);
    res.status(200).json({ message: "ok", data: settings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editUserProfile = async (req, res) => {
  const id = req.user._id;
  const { username, name, email, location, bio, birth } = req.body;
  try {
    const updateFields = {
      username,
      name,
      email,
      location,
      bio,
      birth
    };

    const picture = req.files.picture;
    if (picture) {
      var pictureResult = await uploadSingle(username, picture[0]);
      updateFields.picture = {
        url: pictureResult.secure_url,
        public_id: pictureResult.public_id
      };
    }
    const cover = req.files.cover;
    if (cover) {
      var coverResult = await uploadSingle(username, cover[0]);
      updateFields.cover = {
        url: coverResult.secure_url,
        public_id: coverResult.public_id
      };
    }

    const user = await User.findByIdAndUpdate(id, updateFields, {
      new: true
    });
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const editUserStings = async (req, res) => {
  const id = req.user._id;
  const { displaySensitive, isPrivate } = req.body;
  try {
    let user = await User.findByIdAndUpdate(id, {
      displaySensitive,
      isPrivate
    });
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const pinTweet = async (req, res) => {
  const id = req.user._id;
  const tweet = req.body.tweet;
  try {
    let user = await User.findByIdAndUpdate(id, {
      pinnedTweet: tweet
    });
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const unPinTweet = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(id, {
      pinnedTweet: null
    });
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  getUserTweets,
  getUserReTweets,
  getUserReplies,
  getUserMedia,
  getUserLikes,
  getUserFollowers,
  getUserFollowing,
  getUserBookmarks,
  getUserNotification,
  getUserSettings,
  editUserProfile,
  editUserStings,
  pinTweet,
  unPinTweet
};
/* 
if tweet._id == pinnedTweet:
show pinned Tweet
.pinnedTweet{ order = 1}

other tweet 
if not pinnedTweet: show

*/
