import express from 'express';
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask} from "../controllers/TaskController.js";

const router = express.Router();

router.get('/get-tasks', getAllTasks);
router.post('/add-task', createTask);
router.get('/get-task/:id',getTaskById)
router.delete('/delete-task/:id',deleteTask)
router.patch('/update-task/:id',updateTask)


export default router;
