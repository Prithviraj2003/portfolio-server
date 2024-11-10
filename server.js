const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Profile, Project } = require("./DBModel");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 8888;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/profile", async (req, res) => {
  const profile = await Profile.find();
  res.send(profile[0]);
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
