const express = require("express");
const router = express.Router();
const db = require("../../models");
const authenticate = require("../../auth");

router.get("/all", authenticate, (req, res) => {
  db.user.findAll().then((users) => res.send(users));
});

module.exports = router;
