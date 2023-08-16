const router = require("express").Router();
const { userCreate, userSignup, userLogin, getUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/create", userCreate);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/token-validator", requireAuth, getUser);

module.exports = router;
