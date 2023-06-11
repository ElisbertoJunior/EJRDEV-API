const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const projectsRouter = require("./routes/api/projects")

const cors = require("cors");

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("Server iniciado");
});

app.use(cors({ origin: true, credentials: true }));

app.use("/api/projects", projectsRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
