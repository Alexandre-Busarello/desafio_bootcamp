const express = require("express");

const routes = express.Router();

let projects = [];

function checkProjectExists(req, res, next) {
  req.params.id = Number(req.params.id);

  if (!projects.some(p => p.id === req.params.id)) {
    return res.status(404).json({
      message: "Not found project with id."
    });
  }

  return next();
}

routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

routes.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(project);
});

routes.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);

  return res.json(projects);
});

routes.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(projects);
});

module.exports = routes;
