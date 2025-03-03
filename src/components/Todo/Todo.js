import React, { useEffect, useRef, useState } from "react";
import "../Todo/Todo.css";
import TodoItem from "../TodoItem/TodoItem";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addItem = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos-count", count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos-count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">TODO-LIST</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          className="todo-input"
          type="text"
          placeholder="Add Your Task"
        />
        <button onClick={() => addItem()} className="todo-btn">
          ADD
        </button>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItem
              setTodos={setTodos}
              key={index}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
