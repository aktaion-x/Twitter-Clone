const mongoose = require("mongoose");
const { signupValidator, loginValidator, createValidator } = require("../validators/userValidator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // essintial
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      required: true,
      type: String
    },
    // user info
    picture: {
      public_id: String,
      url: String
    },
    cover: {
      public_id: String,
      url: String
    },
    location: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    birth: {
      type: Date,
      required: true,
      min: "1900-01-01",
      max: "2020-01-01"
    },
    // user settings
    displaySensitive: {
      type: Boolean,
      default: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    // refs
    pendingFollowers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    pendingRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    bookmarks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
      }
    ],
    notification: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Notification"
      }
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    tweets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
      }
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
      }
    ],
    retweets: [
      {
        type: mongoose.Types.ObjectId,
        createdAt: Date.now(),
        ref: "Tweet"
      }
    ],
    pinnedTweet: {
      type: mongoose.Types.ObjectId,
      ref: "Tweet"
    }
  },
  { timestamps: true }
);

UserSchema.statics.createUser = createValidator;
UserSchema.statics.signupUser = signupValidator;
UserSchema.statics.loginUser = loginValidator;

module.exports = mongoose.model("User", UserSchema);
