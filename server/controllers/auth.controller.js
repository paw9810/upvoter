const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const { body, validationResult } = require("express-validator");
const authService = require("../services/auth.service");

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
    } else return res.status(400).send("all fields are required");

    return res.status(201).send(`successfully registered ${name}`);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
            expiresIn: 86400,
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
          sameSite: "none",
          secure: true,
        });
        res.cookie("JWTREFRESH", refreshToken, {
          maxAge: 86400000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({
          message: "successfully logged in",
          user: name,
          id: user.id,
        });
      } else {
        res.status(400).send("invalid password");
      }
    } else {
      res.status(400).send("user does not exist");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.JWTREFRESH;
    if (refreshToken === null || refreshToken === undefined)
      return res.sendStatus(401);

    const decoded = jwtDecode(refreshToken);

    await authService.isTokenInDb(decoded.id);

    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET, {
      // expiresIn: 86400,
      expiresIn: 86400,
    });

    res.cookie("JWT", accessToken, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.sendStatus(200);
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.JWTREFRESH;
    await authService.deleteRefreshToken(refreshToken);
    res.clearCookie("JWT");
    res.clearCookie("JWTREFRESH");

    res.status(200).send("Successfully logged out");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
