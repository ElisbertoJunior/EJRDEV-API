const Project = require("../models/FeaturedProject");
const fs = require("fs");

exports.getProjects = async (req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(404).json({ noProjectsFound: "Nenhum projeto encontrado." })
    );
};

exports.create = async (req, res) => {
  try {
    const { title, description, linkRepos, linkProject, file } = req.body;
    
    const project = new Project({
      title: title,
      description: description,
      linkRepos: linkRepos,
      linkProject: linkProject,
      src: file.path,
    });

    await project.save();
    res.json({  msg: "Projeto salvo com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar imagem" });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.id, req.body);

    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    
    fs.unlinkSync(project.src);

    res.json({ message: "Projeto removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir projeto" });
  }
};
