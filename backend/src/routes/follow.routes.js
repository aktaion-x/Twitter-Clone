const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const { followUser, unFollowUser, getUsers } = require("../controllers/followController");

router.get("/users/:limit", requireAuth, getUsers);
router.post("/:id", requireAuth, followUser);

module.exports = router;
