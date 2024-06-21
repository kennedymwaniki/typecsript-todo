import React, { useReducer, useState, useEffect } from "react";
import "./App.scss";
import bgImage from "./assets/images/bg-desktop-light.jpg";
import todoReducer from "./TodoReducer";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}
const initialTodos: Todo[] = [
  { id: 1, todo: "Buy groceries", completed: false },
  { id: 2, todo: "Do laundry", completed: false },
  { id: 3, todo: "Write report", completed: false },
];
const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: "addTodo", payload: { text: newTodo } });
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "deleteTodo", payload: { id } });
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null && editText.trim()) {
      dispatch({ type: "editTodo", payload: { id: editId, text: editText } });
      setEditId(null);
      setEditText("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: "toggleTodo", payload: { id } });
  };

  return (
    <div className="app">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          backgroundPosition: "left",
        }}
        className="banner"
      >
        <h1>TODO</h1>
        <form onSubmit={handleAddTodo} className="form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit" className="add">
            Add
          </button>
        </form>
      </div>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editId === todo.id ? (
              <form onSubmit={handleUpdateTodo}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span>{todo.todo}</span>
                <button
                  className="edit"
                  onClick={() => handleEditTodo(todo.id, todo.todo)}
                >
                  ✏
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  X
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
