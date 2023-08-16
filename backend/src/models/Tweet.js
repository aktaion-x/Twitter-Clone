const mongoose = require("mongoose");
const {
  tweetValidator,
  reTweetValidator,
  deleteTweetValidator,
  likeTweetValidator,
  addToBookmarkValidator
} = require("../validators/tweetValidator");

const Schema = mongoose.Schema;

const TweetSchema = new Schema(
  {
    // Basic Tweet Info
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    quotedTweet: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "Tweet"
    },
    parentTweet: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "Tweet"
    },
    text: {
      type: String,
      required: true
    },
    mentions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    media: [
      {
        public_id: String,
        url: String,
        mediaType: String
      }
    ],
    hashtags: [
      {
        type: String
      }
    ],
    // Tweet State
    isDeleted: {
      type: Boolean,
      default: false
    },
    isSensitive: {
      type: Boolean,
      default: false
    },
    // Tweet Reactions
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
      }
    ],
    quotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
      }
    ],
    retweets: [
      {
        type: mongoose.Types.ObjectId
      }
    ],
    bookmarkCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

TweetSchema.statics.createTweet = tweetValidator;
TweetSchema.statics.deleteTweet = deleteTweetValidator;
TweetSchema.statics.likeTweet = likeTweetValidator;
TweetSchema.statics.reTweet = reTweetValidator;
TweetSchema.statics.addToBookmark = addToBookmarkValidator;

module.exports = mongoose.model("Tweet", TweetSchema);
