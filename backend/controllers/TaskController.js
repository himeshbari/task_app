

import Task from '../models/TaskModel.js';

// Controller to get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to create a new task
export const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, update, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller to delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;


        await Task.findByIdAndDelete(id);

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
