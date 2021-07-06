const { body, validationResult } = require("express-validator");
const db = require("../models");

exports.validateRegister = [
  body("name").trim().isLength({ min: 5 }),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
];

exports.validateLogin = [body("name").trim(), body("password").trim()];

exports.isTokenInDb = async (userId) => {
  const user = await db.user.findOne({ where: { id: userId } });
  if (user.refreshToken === null) throw new Error("no token in db");
  else return 1;
};

exports.deleteRefreshToken = async (token) => {
  try {
    await db.user.update(
      { refreshToken: null },
      {
        where: {
          refreshToken: token,
        },
      }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
