/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer, useState } from "react";
import todoReducer from "./TodoReducer";
import "../App.scss";
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

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
    <ol>
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
    </ol>
  );
};

export default TodoItem;
