import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputDob, setInputDob] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdateTodo = () => {
    if (editMode && editId !== null) {
      const updatedTodos = todos.map(todo =>
        todo.id === editId ? { ...todo, name: inputName, email: inputEmail, phone: inputPhone, dob: inputDob } : todo
      );
      setTodos(updatedTodos);
      setEditMode(false);
      setEditId(null);
      setInputName('');
      setInputEmail('');
      setInputPhone('');
      setInputDob('');
    } else {
      if (inputName.trim() !== '' && inputEmail.trim() !== '' && inputPhone.trim() !== '' && inputDob.trim() !== '') {
        const newTodo = {
          id: todos.length + 1,
          name: inputName,
          email: inputEmail,
          phone: inputPhone,
          dob: inputDob,
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputName('');
        setInputEmail('');
        setInputPhone('');
        setInputDob('');
      }
    }
  };

  const handleEditTodo = (id, name, email, phone, dob) => {
    setEditMode(true);
    setEditId(id);
    setInputName(name);
    setInputEmail(email);
    setInputPhone(phone);
    setInputDob(dob);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder={editMode ? "Update name" : "Enter name"}
          value={inputName}
          onChange={e => setInputName(e.target.value)}
        />
        <input
          type="text"
          placeholder={editMode ? "Update email" : "Enter email"}
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder={editMode ? "Update phone" : "Enter phone"}
          value={inputPhone}
          onChange={e => setInputPhone(e.target.value)}
        />
        <input
          type="date"
          placeholder={editMode ? "Update dob" : "Enter dob"}
          value={inputDob}
          onChange={e => setInputDob(e.target.value)}
        />
        <button onClick={handleAddOrUpdateTodo}>{editMode ? 'Update' : '+'}</button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} className={todo.completed ? 'completed' : ''}>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.phone}</td>
              <td>{todo.dob}</td>
              <td>
                <button className='edit-button' onClick={() => handleEditTodo(todo.id, todo.name, todo.email, todo.phone, todo.dob)}>✏️ Edit</button>
                <button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}>❌ Delete</button>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
