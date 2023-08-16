const router = require("express").Router();
const upload = require("../middleware/multer");
const requireAuth = require("../middleware/requireAuth");
const { postRetweet, postTweet, deleteTweet, postLike, postBookmarks } = require("../controllers/tweetsPostController");
const {
  getTweet,
  getParent,
  getReplies,
  getQuotes,
  getRetweets,
  getLikes
} = require("../controllers/tweetsGetController");

router.get("/:id", requireAuth, getTweet);
router.get("/:id/parent", requireAuth, getParent);
router.get("/:id/replies", requireAuth, getReplies);
router.get("/:id/quotes", requireAuth, getQuotes);
router.get("/:id/retweets", requireAuth, getRetweets);
router.get("/:id/likes", requireAuth, getLikes);
router.post("/", requireAuth, upload.fields([{ name: "media", maxCount: 4 }]), postTweet);
router.delete("/:id", requireAuth, deleteTweet);
router.post("/:id/like", requireAuth, postLike);
router.post("/:id/retweet", requireAuth, postRetweet);
router.post("/:id/bookmark", requireAuth, postBookmarks);

module.exports = router;
