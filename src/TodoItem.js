import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li
      className={todo.completed ? 'completed' : ''}
      onClick={() => toggleComplete(todo.id)}
    >
      {todo.task}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
