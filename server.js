const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For unique IDs
const app = express();

const tasks = {}; // Store tasks as { id: task }

app.use(bodyParser.json());
app.use(express.static('public'));

// Add a task
app.post('/add-task', (req, res) => {
    const { task } = req.body;
    if (task) {
        const taskId = uuidv4();
        tasks[taskId] = task;
        res.status(200).send({ taskId });
    } else {
        res.status(400).send({ error: 'Task is required' });
    }
});

// Remove a task
app.delete('/remove-task/:id', (req, res) => {
    const { id } = req.params;
    if (tasks[id]) {
        delete tasks[id];
        res.status(200).send({ success: true });
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
