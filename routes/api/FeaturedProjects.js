const express = require("express");
const router = express.Router();

const upload = require("../../config/multer")

const FeaturedProjectController = require("../../controllers/FeaturedProjectController")

router.get("/", FeaturedProjectController.getProjects);
router.post("/", upload.single("file"), FeaturedProjectController.create);
router.delete("/:id", FeaturedProjectController.remove);

module.exports = router