const mongoose = require("mongoose");
const { notifyUserValidator } = require("../validators/notificationValidator");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    recipient: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    sourceUser: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    notificationType: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    tweet: {
      type: mongoose.Types.ObjectId,
      ref: "Tweet",
      default: null
    },
    readStatus: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

NotificationSchema.statics.notifyUser = notifyUserValidator;

module.exports = mongoose.model("Notification", NotificationSchema);

/* 
  _id,
  recipient: userRef,
  type: all || mention,
  sourceUser: userRef,
  action: retweet || like || mention || follow || reply || quoted,
  tweet: tweetRef || null,
  readStatus: Boolean,
  createdAt: date
*/
