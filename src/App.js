import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import './App.css';  // Import the CSS file

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    } else {
      const fetchTodos = async () => {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTodos(data.todos.slice(0, 5));
      };
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    /** Todo Set in LocalStorage */
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /** Add Todo task */
  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  /** Update to complete the task */
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  /** delete the todo task */
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  /** Filter by Pending, Completed */
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
