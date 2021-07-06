const db = require("../models");

exports.getUsers = async (req, res) => {
  db.user.findAll().then((users) => res.send(users));
};
