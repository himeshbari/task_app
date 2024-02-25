import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdateTask = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Logic for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="mb-4">Task List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <div key={task._id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Title: {task.title}</h5>
                  <p className="card-text">Description: {task.description}</p>
                  <p className="card-text">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={() => handleUpdateTask(task._id)}>Update Task</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete Task</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GetTaskPage;
