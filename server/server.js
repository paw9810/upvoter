const app = require("./app");

const PORT = process.env.PORT || 5000;
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err.message));
