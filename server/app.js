const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const voteRoute = require("./routes/vote.routes");
const pageRoute = require("./routes/page.routes");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/votes", voteRoute);
app.use("/page", pageRoute);

app.use((req, res) => {
  res.status(404).send("404: page not found");
});

module.exports = app;
