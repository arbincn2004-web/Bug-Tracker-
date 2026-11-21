import Issue from '../models/Issue.js';
import Project from '../models/Project.js';
const allowedStatuses = ['To Do', 'In Progress', 'Done'];
export async function listIssues(req, res) {
  const filter = {};
  if (req.query.project) filter.project = req.query.project;
  if (req.query.status && allowedStatuses.includes(req.query.status)) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };
  const issues = await Issue.find(filter).populate('createdBy', 'name email').populate('assignee', 'name email').sort({ createdAt: -1 });
  res.json(issues);
}
export async function createIssue(req, res) {
  const { title, description, project, priority, assignee } = req.body;
  if (!title?.trim() || !project) return res.status(400).json({ message: 'Title and project are required.' });
  const ownedProject = await Project.findOne({ _id: project, owner: req.user._id });
  if (!ownedProject) return res.status(404).json({ message: 'Project not found.' });
  const issue = await Issue.create({ title, description, project, priority, assignee: assignee || null, createdBy: req.user._id });
  res.status(201).json(await issue.populate(['createdBy', 'assignee']));
}
export async function updateIssue(req, res) {
  if (req.body.status && !allowedStatuses.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status.' });
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('createdBy', 'name').populate('assignee', 'name email');
  if (!issue) return res.status(404).json({ message: 'Issue not found.' });
  res.json(issue);
}
export async function deleteIssue(req, res) {
  const issue = await Issue.findByIdAndDelete(req.params.id);
  if (!issue) return res.status(404).json({ message: 'Issue not found.' });
  res.json({ message: 'Issue deleted.' });
}
export async function addComment(req, res) {
  if (!req.body.text?.trim()) return res.status(400).json({ message: 'Comment cannot be empty.' });
  const issue = await Issue.findById(req.params.id);
  if (!issue) return res.status(404).json({ message: 'Issue not found.' });
  issue.comments.push({ user: req.user._id, text: req.body.text.trim() });
  await issue.save();
  await issue.populate('comments.user', 'name');
  res.status(201).json(issue.comments);
}
