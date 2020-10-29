import React, { useState, useEffect } from "react";
import Todos from "../Todos";

function Form() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterStatus();
    saveLocalTodos();
  }, [todos, status]);

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  const filterStatus = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const SubmitHandeler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: input, completed: false, id: Math.random() * 96 },
    ]);
    setInput("");
  };

  return (
    <div>
      <form>
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="todos-input"
        />
        <button className="todos-button" onClick={SubmitHandeler} type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select
            onChange={statusHandler}
            name="todos"
            className="filter-todos"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          <Todos
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
