import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      if (isEditing) {
        const updatedTasks = tasks.map((task, index) =>
          index === currentTaskIndex ? { ...task, task: newTask } : task
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, { task: newTask, completed: false }]);
      }
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].task);
  };

  return (
    <div className="app">
      <h1>Enhanced To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)} className="task-text">
              {task.task}
            </span>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
