const router = require("express").Router();
const { checkEmail, userSignup, userLogin, getUser } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/check-email", checkEmail);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/token-validator", requireAuth, getUser);

module.exports = router;
