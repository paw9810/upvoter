const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const { body, validationResult } = require("express-validator");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    if (name && password && email) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await db.user.create({
        name: name,
        password: hashedPassword,
        email: email,
        karma: 0,
        role: "user",
      });
    } else return res.sendStatus(400);

    return res.status(201).send(`successfully registered ${name}`);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;

    const user = await db.user.findOne({ where: { name: name } });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 20,
            // expiresIn: 86400,
          }
        );
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: 525600,
          }
        );

        //CSRF

        await user.update({ refreshToken: refreshToken });

        res.cookie("JWT", accessToken, {
          maxAge: 86400000,
          httpOnly: true,
        });
        res.cookie("JWTREFRESH", refreshToken, {
          maxAge: 86400000,
          httpOnly: true,
        });
        res.status(200).send("successfully logged in");
      } else {
        res.status(401).send("invalid password");
      }
    } else {
      res.status(401).send("user does not exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.JWTREFRESH;
    if (refreshToken === null) return res.sendStatus(401);

    // TODO: check if refreshToken exists in DB

    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const decoded = jwtDecode(refreshToken);

    const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET, {
      // expiresIn: 86400,
      expiresIn: 20,
    });

    res.cookie("JWT", accessToken, {
      maxAge: 86400000,
      httpOnly: true,
    });
    res.send({ accessToken });
  } catch (err) {
    return res.status(403).send(err);
  }
};
