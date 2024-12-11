const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

let tasksCopy = tasks.slice();

function addNewTask(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  tasks = addNewTask(tasks, taskId, text, priority);
  res.json(tasks);
});

function getCurrentSatetOfTheTaskList(tasksCopy) {
  return tasksCopy;
}

app.get('/tasks', (req, res) => {
  let result = getCurrentSatetOfTheTaskList(tasksCopy);
  res.json(tasksCopy);
});

function sortByAscendingPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortByAscendingPriority);
  res.json(result);
});

function updatePriorityBasedOnTaskId(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updatePriorityBasedOnTaskId(tasks, taskId, priority);
  res.json(result);
});

function updateTaskTextByTaskId(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskTextByTaskId(tasks, taskId, text);
  res.json(result);
});

function deleteTaskById(ele, taskId) {
  return ele.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((ele) => deleteTaskById(ele, taskId));
  tasks = result;
  res.json(result);
});

function filterTaskByPriority(ele, priority) {
  return ele.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((ele) => filterTaskByPriority(ele, priority));
  res.json(result);
});

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
