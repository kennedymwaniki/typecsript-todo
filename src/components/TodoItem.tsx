import { useState } from "react";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onEdit,
  onToggle,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleEditTodo = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null && editText.trim()) {
      onEdit(editId, editText);
      setEditId(null);
      setEditText("");
    }
  };

  return (
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
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.todo}</span>
          <button
            className="edit"
            onClick={() => handleEditTodo(todo.id, todo.todo)}
          >
            ✏
          </button>
          <button className="delete" onClick={() => onDelete(todo.id)}>
            X
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
