import Project from '../models/Project.js';
import Issue from '../models/Issue.js';
export async function listProjects(req, res) {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(projects);
}
export async function createProject(req, res) {
  const { name, description } = req.body;
  if (!name?.trim()) return res.status(400).json({ message: 'Project name is required.' });
  const project = await Project.create({ name, description, owner: req.user._id, members: [req.user._id] });
  res.status(201).json(project);
}
export async function updateProject(req, res) {
  const project = await Project.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  res.json(project);
}
export async function deleteProject(req, res) {
  const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found.' });
  await Issue.deleteMany({ project: project._id });
  res.json({ message: 'Project and its issues deleted.' });
}
