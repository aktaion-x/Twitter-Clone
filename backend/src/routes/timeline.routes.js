const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getTrends,
  tweetsForYou,
  TweetsFollowing
} = require("../controllers/timelineController");

router.get("/trends", requireAuth, getTrends);
router.get("/tweets/for-you", requireAuth, tweetsForYou);
router.get("/tweets/following", requireAuth, TweetsFollowing);

/* 
(you might like) & users (who to follow)
*/

module.exports = router;
