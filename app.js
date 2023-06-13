const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

const projectsRouter = require("./routes/api/projects")
const FeaturedProjects = require('./routes/api/FeaturedProjects')
const userRouter = require('./routes/login/user')

const cors = require("cors");

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.send("Server iniciado");
});


app.use("/api/projects", projectsRouter)
app.use("/api/destaques", FeaturedProjects)
app.use('/user', userRouter)
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
