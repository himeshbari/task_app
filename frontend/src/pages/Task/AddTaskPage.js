import React, { useState } from 'react';
import axios from 'axios';

const AddTaskPage = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/add-task', newTask);
      console.log('Task added successfully');
      setSuccessMessage('Task added successfully');
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage('Error creating task');
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Add Task</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Add Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
