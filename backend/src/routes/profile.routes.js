const router = require("express").Router();
const upload = require("../middleware/multer");
const requireAuth = require("../middleware/requireAuth");
const {
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
} = require("../controllers/profileController");

router.get("/bookmarks", requireAuth, getUserBookmarks);
router.get("/notifications/:type", requireAuth, getUserNotification);
router.get("/user/settings", requireAuth, getUserSettings);
router.post(
  "/edit/info",
  requireAuth,
  upload.fields([{ name: "picture", maxCount: 1 }, { name: "cover", maxCount: 1 }]),
  editUserProfile
);
router.post("/edit/settings", requireAuth, editUserStings);
router.post("/pin-tweet/:tweet", requireAuth, pinTweet);
router.post("/unpin-tweet/:tweet", requireAuth, unPinTweet);
router.get("/:username", requireAuth, getUser);
router.get("/:username/tweets", requireAuth, getUserTweets);
router.get("/:username/retweets", requireAuth, getUserReTweets);
router.get("/:username/replies", requireAuth, getUserReplies);
router.get("/:username/media", requireAuth, getUserMedia);
router.get("/:username/likes", requireAuth, getUserLikes);
router.get("/:id/followers", requireAuth, getUserFollowers);
router.get("/:id/following", requireAuth, getUserFollowing);

module.exports = router;
