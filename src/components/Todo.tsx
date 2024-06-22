import { useReducer, useState, useEffect } from "react";
import "../App.scss";
import bgImage from "../assets/images/bg-desktop-light.jpg";
import todoReducer from "./TodoReducer";
import TodoItem from "./TodoItem";

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

  const handleAddTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: "addTodo", payload: { text: newTodo } });
      setNewTodo("");
    }
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
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todo;
