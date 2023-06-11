const express = require("express");
const router = express.Router();

const upload = require("../../config/multer")

const ProjectController = require("../../controllers/projectController")

router.get("/", ProjectController.getProjects);
router.post("/", upload.single("file"), ProjectController.create);
router.delete("/:id", ProjectController.remove);

module.exports = router