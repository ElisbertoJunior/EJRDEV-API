const mongoose = require("mongoose");

const FeaturedProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { 
    type: String, 
    required: true 
  },
  linkRepos: { 
    type: String, 
    required: true 
  },
  linkProject: { 
    type: String, 
    required: true 
  },
  src: {
    type: String,
    required: true
  },
});


module.exports = FeaturedProjects = mongoose.model('FeaturedProjects', FeaturedProjectSchema)