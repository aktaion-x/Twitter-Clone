const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running!" });
});
app.use("/api/user", require("./src/routes/user.routes"));
app.use("/api/profile", require("./src/routes/profile.routes"));
app.use("/api/timeline", require("./src/routes/timeline.routes"));
app.use("/api/tweets", require("./src/routes/tweets.routes"));
app.use("/api/follow", require("./src/routes/follow.routes"));

mongoose
  .connect(process.env.MONGO_URI, { dbName: "twitter-clone" })
  .then(() => {
    app.listen(port, () => console.log("Server is listening on port " + port));
  })
  .catch(err => {
    console.log(err);
  });
