const Notification = require("../models/Notification");
const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const tweetValidator = async function(post, author, media) {
  // destruct post
  const { quotedTweet, parentTweet, text, mentions, hashtags, isSensitive } = post;
  // Check if post is not empty
  if (!text) {
    throw Error("All fields must be filled!");
  }
  try {
    const tweetObject = {
      author,
      quotedTweet,
      parentTweet,
      text,
      mentions,
      hashtags,
      isSensitive
    };
    if (media && media.length > 0) {
      tweetObject.media = [];
      media.forEach(m => {
        tweetObject.media.push({
          public_id: m.public_id,
          url: m.secure_url,
          mediaType: m.resource_type
        });
      });
    }
    // create post
    const tweet = await this.create(tweetObject);

    // update the author tweets
    await User.updateOne({ _id: author }, { $push: { tweets: tweet._id } });

    // check if the tweet is a reply
    if (parentTweet) {
      // update the parent post
      await this.updateOne({ _id: parentTweet }, { $push: { replies: tweet._id } });

      // get the parent user id and update his notification
      const userId = await this.findById(parentTweet);
      await Notification.notifyUser(userId.author, author, {
        notificationType: "MENTION",
        action: "REPLY",
        tweet: tweet._id
      });
    }

    // check if the tweet is a quoted
    if (quotedTweet) {
      // update the quoted post
      await this.updateOne({ _id: quotedTweet }, { $push: { quotes: tweet._id } });

      // get the quoted user id and update his notification
      const userId = await this.findById(quotedTweet);
      await Notification.notifyUser(userId.author, author, {
        notificationType: "MENTION",
        action: "QUOTED",
        tweet: tweet._id
      });
    }

    return tweet;
  } catch (error) {
    throw Error(error);
  }
};

const deleteTweetValidator = async function(author, id) {
  try {
    const tweetAuthor = await this.findById(id);
    if (tweetAuthor === id) {
      throw Error("Unauthorized Action");
    }
    await this.findByIdAndDelete(id);
    await User.findByIdAndUpdate(author, { $pull: { tweets: id } });
  } catch (error) {
    throw Error(error);
  }
};

const reTweetValidator = async function(tweetId, id) {
  try {
    if ((await this.findById(tweetId)).retweets.includes(id)) {
      // throw Error("Tweet already been liked!");
      await this.findByIdAndUpdate(tweetId, { $pull: { retweets: id } });
      await User.findByIdAndUpdate(id, { $pull: { retweets: tweetId } });
    } else {
      const updatedTweet = await this.findByIdAndUpdate(tweetId, { $push: { retweets: id } });
      const user = updatedTweet.author;
      if (id.toString() !== user.toString()) {
        await Notification.notifyUser(user, id, {
          notificationType: "ALL",
          action: "RETWEET",
          tweet: tweetId
        });
      }
      await User.findByIdAndUpdate(id, { $push: { retweets: tweetId } });
    }
  } catch (error) {
    throw Error(error);
  }
};

const likeTweetValidator = async function(tweetId, id) {
  try {
    if ((await this.findById(tweetId)).likes.includes(id)) {
      await this.findByIdAndUpdate(tweetId, { $pull: { likes: id } });
      await User.findByIdAndUpdate(id, { $pull: { likes: tweetId } });
    } else {
      const updatedTweet = await this.findByIdAndUpdate(tweetId, { $push: { likes: id } });
      const user = updatedTweet.author;
      if (id.toString() !== user.toString()) {
        await Notification.notifyUser(user, id, {
          notificationType: "ALL",
          action: "LIKE",
          tweet: tweetId
        });
      }
      await User.findByIdAndUpdate(id, { $push: { likes: tweetId } });
    }
  } catch (error) {
    throw Error(error);
  }
};

const addToBookmarkValidator = async function(tweetId, id) {
  try {
    if ((await User.findById(id)).bookmarks.includes(tweetId)) {
      await this.findByIdAndUpdate(tweetId, {
        $inc: { bookmarkCount: -1 }
      });
      await User.findByIdAndUpdate(id, {
        $pull: { bookmarks: tweetId }
      });
    } else {
      await this.findByIdAndUpdate(tweetId, {
        $inc: { bookmarkCount: 1 }
      });
      await User.findByIdAndUpdate(id, {
        $push: { bookmarks: tweetId }
      });
    }
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  tweetValidator,
  reTweetValidator,
  deleteTweetValidator,
  likeTweetValidator,
  addToBookmarkValidator
};
