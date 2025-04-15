const express = require("express");
const { getUser, registerUser, loginUser } = require("../controllers/user");

const router = express.Router();

router.get("/:userId", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
