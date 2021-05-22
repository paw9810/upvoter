const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  // TODO: validate
  if (name && password && email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await db.user.create({
        name: name,
        password: hashedPassword,
        email: email,
        karma: 0,
        role: "user",
      });
    } catch (err) {
      return res.sendStatus(401);
    }
  } else return res.sendStatus(400);
  //const validPassword = await bcrypt.compare(password, user[0].password);

  return res.status(201).send(`successfully registered ${name}`);
});

router.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const user = await db.user.findOne({ where: { name: name } });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 20,
      });
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: 525600,
        }
      );

      //CSRF

      res.cookie("JWT", accessToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      res.status(200).send({ accessToken, refreshToken });
    } else {
      res.status(401).send("invalid password");
    }
  } else {
    res.status(401).send("user does not exist");
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  // TODO: check if refreshToken exists in DB
  try {
    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.sendStatus(403);
  }

  const accessToken = jwt.sign({ id: 1 }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.send({ accessToken });
});

module.exports = router;
