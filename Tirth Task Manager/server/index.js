const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { title, description, completed } = req.body;
  
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
