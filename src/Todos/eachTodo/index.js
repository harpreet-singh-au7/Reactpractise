import React from "react";

function EachTodo({ todoText, setTodos, todo, todos }) {
  const deleteHandeler = (e) => {
    e.preventDefault();
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id)
          return {
            ...item,
            completed: !item.completed,
          };
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {todoText}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check" />
      </button>
      <button onClick={deleteHandeler} className="trash-btn">
        <i className="fas fa-trash" />
      </button>
    </div>
  );
}

export default EachTodo;
