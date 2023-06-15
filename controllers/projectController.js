const Project = require("../models/Project");
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
    const { title, description, linkRepos, linkProject } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    const formData = {
      title,
      description,
      linkRepos,
      linkProject,
      file: {
        name: file.originalname,
        path: file.path,
      },
    };

    const project = new Project({
      title: formData.title,
      description: formData.description,
      linkRepos: formData.linkRepos,
      linkProject: formData.linkProject,
      src: formData.file.path,
    });

    await project.save();
    res.json({ msg: "Projeto salvo com sucesso!" });
  } catch (err) {
    res.status(500).json({ err, message: "Erro ao salvar imagem" });
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
