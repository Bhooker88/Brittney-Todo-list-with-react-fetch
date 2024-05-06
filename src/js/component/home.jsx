import React, { useEffect, useState } from "react";
import { getallTodos, createTodo, updateTodo, deleteTodo, clearAllTodos } from "./todoList";

const Home = () => {
  const [Todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const userName = "bhooker";


  useEffect(() => {
    const fetchData = async () => {
        let apiTodos = await getallTodos();
        apiTodos = apiTodos.map(todo => ({ ...todo, done: todo.done ?? false }));
        setTodos(apiTodos);
    };

    fetchData();
}, []);

  const handleCreateTodo = async (label) => {
    const newTodo = await createTodo(userName, { label: label, is_done: false });
    if (newTodo) {
      setTodos(prev => [...prev, newTodo]);
    }
  };

  const onType = (event) => {
    setInputValue(event.target.value);
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      handleCreateTodo(event.target.value);
      setInputValue("");
    }
  };

  const toggleTodoDone = async (index) => {
    const updatedTodos = [...Todos];
    updatedTodos[index] = {
        ...updatedTodos[index],
        done: !updatedTodos[index].done
    };
    try {
        const response = await updateTodo(updatedTodos[index].id, updatedTodos[index]);
        if (response) {
            console.log('Updated todo:', response);
            setTodos(updatedTodos);
        } else {
            console.error("API call was successful, but no response was returned.");
        }
    } catch (error) {
        console.error('Failed to update todo:', error);
    }
};

  const handleDeleteTodo = async (index) => {
    const todoId = Todos[index].id;
    if (await deleteTodo(todoId)) {
      let newTodos = [...Todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  const handleClearAll = async () => {
    await clearAllTodos(userName);
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          onKeyUp={onType}
          placeholder="Enter Todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <ul className="todo-ul">
        {Todos.map((todo, index) => (
          <li className="todo-item" key={index}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodoDone(index)}
            />
            <p className="todo-label">{todo.label}</p>
            <button
              className="todo-delete-item"
              onClick={() => handleDeleteTodo(index)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-footer">
        <p className="todo-items-left">{Todos.length} item(s) left</p>
        <button className="todo-undo-button" onClick={() => setTodos([...Todos])}>
          Undo
        </button>
        <button className="todo-clearall-button" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Home;
